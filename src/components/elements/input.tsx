import React, {
  useState,
  forwardRef,
  type InputHTMLAttributes,
  useEffect,
} from "react";
import { Eye, EyeSlash } from "iconsax-reactjs";

// File icon for file inputs
const FileIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
  </svg>
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value"> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "outlined" | "filled";
  size?: "small" | "medium" | "large";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  // Formik integration props
  name?: string;
  touched?: boolean;
  // File input specific props
  filePreview?: boolean;
  acceptedFileTypes?: string;
  maxFileSize?: number; // in MB
  multiple?: boolean;
  fileValue?: File | File[] | null;
  onFileChange?: (files: File[] | null) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      variant = "outlined",
      size = "medium",
      startIcon,
      endIcon,
      fullWidth = false,
      className = "",
      type = "text",
      disabled = false,
      required = false,
      name,
      acceptedFileTypes,
      maxFileSize = 5,
      multiple = false,
      onFileChange,
      fileValue = null,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File[]>([]);
    const [fileError, setFileError] = useState<string>("");

    useEffect(() => {
      if (!fileValue) return setSelectedFile([]);
      if (multiple && Array.isArray(fileValue)) {
        setSelectedFile(fileValue);
      } else if (!multiple && fileValue instanceof File) {
        setSelectedFile([fileValue]);
      }
    }, [fileValue, multiple]);

    // Handle password toggle
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const filesArray = e.target.files ? Array.from(e.target.files) : [];
      setFileError("");

      if (multiple && filesArray.length > 3) {
        setFileError("You can only upload up to 3 files");
        onFileChange?.(null);
        return;
      }

      for (const file of filesArray) {
        if (file.size > maxFileSize * 1024 * 1024) {
          setFileError(`Each file must be less than ${maxFileSize}MB`);
          onFileChange?.(null);
          return;
        }
        if (
          acceptedFileTypes &&
          !acceptedFileTypes
            .split(",")
            .some(
              (type) =>
                file.type.match(type.trim()) || file.name.endsWith(type.trim())
            )
        ) {
          setFileError("One or more file types not supported");
          onFileChange?.(null);
          return;
        }
      }

      setSelectedFile(filesArray);
      onFileChange?.(
        multiple ? filesArray : filesArray.length > 0 ? [filesArray[0]] : null
      );
    };

    // Size classes
    const sizeClasses = {
      small: "px-3 py-2 text-sm",
      medium: "px-4 py-3 text-base",
      large: "px-5 py-4 text-lg",
    };

    // Variant classes
    const variantClasses = {
      outlined: "border border-[#06275A] bg-white",
      filled: "border-0 bg-gray-100",
    };

    // Error state classes
    const errorClasses =
      error || fileError
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : "border-[#06275A] focus:border-blue-500 focus:ring-blue-500";

    // Base input classes
    const inputClasses = `
    w-full rounded-lg transition-all duration-200 outline-none
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${errorClasses}
    ${disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : "focus:ring-2 focus:ring-opacity-50"}
    ${startIcon ? "pl-12" : ""}
    ${type === "password" || endIcon ? "pr-12" : ""}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

    const inputType =
      type === "password" ? (showPassword ? "text" : "password") : type;

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-[#06275A] mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Start Icon */}
          {startIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {startIcon}
            </div>
          )}

          {/* File Input */}
          {type === "file" ? (
            <label>
              <input
                ref={ref}
                type="file"
                className="hidden"
                multiple={multiple}
                onChange={handleFileChange}
                accept={acceptedFileTypes}
                disabled={disabled}
                // Do not pass value for file input
                {...props}
              />
              <div
                className={`${inputClasses} cursor-pointer flex items-center justify-between`}
                onClick={() =>
                  !disabled &&
                  (ref as React.RefObject<HTMLInputElement>)?.current?.click()
                }
              >
                <div className="flex items-center">
                  <FileIcon className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">
                    {selectedFile.length
                      ? `${selectedFile.length} file(s) selected`
                      : "Choose file..."}
                  </span>
                </div>
                <span className="text-sm text-gray-400">Browse</span>
              </div>
            </label>
          ) : (
            /* Regular Input */
            <input
              ref={ref}
              type={inputType}
              className={inputClasses}
              disabled={disabled}
              name={name}
              {...props}
            />
          )}

          {/* End Icon / Password Toggle */}
          {type === "password" ? (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={togglePasswordVisibility}
              disabled={disabled}
            >
              {showPassword ? (
                <EyeSlash size="22" color="#9CA3AF" />
              ) : (
                <Eye size="22" color="#9CA3AF" />
              )}
            </button>
          ) : endIcon ? (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {endIcon}
            </div>
          ) : null}
        </div>

        {/* File Preview */}
        {/* {type === 'file' && filePreview && selectedFile && (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">{selectedFile.name}</span>
            </div>
            <div className="text-xs text-gray-400">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>
        </div>
      )} */}

        {/* Error Message */}
        {(error || fileError) && (
          <p className="mt-2 text-sm text-red-600">{error || fileError}</p>
        )}

        {/* Helper Text */}
        {helperText && !error && !fileError && (
          <p className="mt-2 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
