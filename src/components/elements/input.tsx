import React, { useState, forwardRef, type InputHTMLAttributes } from 'react';
import { Eye, EyeSlash } from 'iconsax-reactjs';

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

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
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
  onFileChange?: (file: File | null) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  variant = 'outlined',
  size = 'medium',
  startIcon,
  endIcon,
  fullWidth = false,
  className = '',
  type = 'text',
  disabled = false,
  required = false,
  name,
  touched = false,
  filePreview = false,
  acceptedFileTypes,
  maxFileSize = 5, // 5MB default
  onFileChange,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');

  // Handle password toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileError('');

    if (file) {
      // Validate file size
      if (file.size > maxFileSize * 1024 * 1024) {
        setFileError(`File size must be less than ${maxFileSize}MB`);
        setSelectedFile(null);
        onFileChange?.(null);
        return;
      }

      // Validate file type if specified
      if (acceptedFileTypes && !acceptedFileTypes.split(',').some(type => 
        file.type.match(type.trim()) || file.name.endsWith(type.trim())
      )) {
        setFileError('File type not supported');
        setSelectedFile(null);
        onFileChange?.(null);
        return;
      }
    }

    setSelectedFile(file);
    onFileChange?.(file);
  };

  // Size classes
  const sizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 text-base',
    large: 'px-5 py-4 text-lg'
  };

  // Variant classes
  const variantClasses = {
    outlined: 'border border-gray-300 bg-white',
    filled: 'border-0 bg-gray-100'
  };

  // Error state classes
  const errorClasses = error || fileError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

  // Base input classes
  const inputClasses = `
    w-full rounded-lg transition-all duration-200 outline-none
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${errorClasses}
    ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-50' : 'focus:ring-2 focus:ring-opacity-50'}
    ${startIcon ? 'pl-12' : ''}
    ${(type === 'password' || endIcon) ? 'pr-12' : ''}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
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
        {type === 'file' ? (
          <>
            <input
              ref={ref}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept={acceptedFileTypes}
              disabled={disabled}
              {...props}
            />
            <div
              className={`${inputClasses} cursor-pointer flex items-center justify-between`}
              onClick={() => !disabled && (ref as React.RefObject<HTMLInputElement>)?.current?.click()}
            >
              <div className="flex items-center">
                <FileIcon className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">
                  {selectedFile ? selectedFile.name : 'Choose file...'}
                </span>
              </div>
              <span className="text-sm text-gray-400">Browse</span>
            </div>
          </>
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
        {type === 'password' ? (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={togglePasswordVisibility}
            disabled={disabled}
          >
            {showPassword ? <EyeSlash size="32" color="#FF8A65"/> : <Eye size="32" color="#FF8A65"/>}
          </button>
        ) : endIcon ? (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {endIcon}
          </div>
        ) : null}
      </div>

      {/* File Preview */}
      {type === 'file' && filePreview && selectedFile && (
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
      )}

      {/* Error Message */}
      {(error || fileError) && (
        <p className="mt-2 text-sm text-red-600">
          {error || fileError}
        </p>
      )}

      {/* Helper Text */}
      {helperText && !error && !fileError && (
        <p className="mt-2 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;