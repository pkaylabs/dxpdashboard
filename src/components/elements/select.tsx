import React, { useState, useCallback, useEffect, forwardRef } from "react";
import { motion } from "framer-motion";

// Select option interface
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "outlined" | "filled";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  // Core select props
  options: SelectOption[];
  value?: string | number;
  onChange: (value: string | number, option: SelectOption) => void;
  // Multi-select support
  multiple?: boolean;
  multipleValues?: (string | number)[];
  onMultipleChange?: (
    values: (string | number)[],
    options: SelectOption[]
  ) => void;
  // Validation
  validate?: (
    value: string | number | (string | number)[]
  ) => string | undefined;
  // Formik integration
  name?: string;
  touched?: boolean;
  // Advanced features
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  maxHeight?: string;
  className?: string;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      variant = "outlined",
      size = "medium",
      fullWidth = false,
      disabled = false,
      required = false,
      placeholder = "Select an option...",
      options = [],
      value,
      onChange,
      multiple = false,
      multipleValues = [],
      onMultipleChange,
      validate,
      name,
      touched = false,
      searchable = false,
      clearable = false,
      loading = false,
      maxHeight = "240px",
      className = "",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [validationError, setValidationError] = useState<string>("");

    // Get current selection for display
    const getSelectedOptions = useCallback(() => {
      if (multiple) {
        return options.filter((option) =>
          multipleValues.includes(option.value)
        );
      } else {
        return options.find((option) => option.value === value);
      }
    }, [multiple, multipleValues, value, options]);

    const selectedOptions = getSelectedOptions();

    const filteredOptions =
      searchable && searchQuery
        ? options.filter(
            (option) =>
              option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
              String(option.value)
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
        : options;

    useEffect(() => {
      if (validate) {
        const currentValue: any = multiple ? multipleValues : value;
        const error = validate(currentValue);
        setValidationError(error || "");
      }
    }, [validate, multiple, multipleValues, value]);

    // Handle single select
    const handleSingleSelect = useCallback(
      (option: SelectOption) => {
        if (option.disabled) return;

        onChange(option.value, option);
        setIsOpen(false);
        setSearchQuery("");
      },
      [onChange]
    );

    // Handle multiple select
    const handleMultipleSelect = useCallback(
      (option: SelectOption) => {
        if (option.disabled || !onMultipleChange) return;

        const isSelected = multipleValues.includes(option.value);
        let newValues: (string | number)[];
        let newOptions: SelectOption[];

        if (isSelected) {
          // Remove from selection
          newValues = multipleValues.filter((val) => val !== option.value);
          newOptions = options.filter((opt) => newValues.includes(opt.value));
        } else {
          // Add to selection
          newValues = [...multipleValues, option.value];
          newOptions = options.filter((opt) => newValues.includes(opt.value));
        }

        onMultipleChange(newValues, newOptions);
      },
      [multipleValues, onMultipleChange, options]
    );

    // Handle selection
    const handleSelect = useCallback(
      (option: SelectOption) => {
        if (multiple) {
          handleMultipleSelect(option);
        } else {
          handleSingleSelect(option);
        }
      },
      [multiple, handleMultipleSelect, handleSingleSelect]
    );

    // Clear selection
    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();

        if (multiple && onMultipleChange) {
          onMultipleChange([], []);
        } else {
          // For single select, call onChange with empty value
          const emptyOption: SelectOption = { label: "", value: "" };
          onChange("", emptyOption);
        }

        setSearchQuery("");
      },
      [multiple, onMultipleChange, onChange]
    );

    // Remove single item from multiple selection
    const removeFromMultiple = useCallback(
      (optionValue: string | number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!onMultipleChange) return;

        const newValues = multipleValues.filter((val) => val !== optionValue);
        const newOptions = options.filter((opt) =>
          newValues.includes(opt.value)
        );
        onMultipleChange(newValues, newOptions);
      },
      [multipleValues, onMultipleChange, options]
    );

    // Size classes
    const sizeClasses = {
      small: "px-3 py-2 text-sm min-h-[36px]",
      medium: "px-4 py-3 text-base min-h-[44px]",
      large: "px-5 py-4 text-lg min-h-[52px]",
    };

    // Variant classes
    const variantClasses = {
      outlined: "border border-[#06275A] bg-white",
      filled: "border-0 bg-gray-100",
    };

    // Error state classes
    const hasError = error || validationError;
    const errorClasses = hasError
      ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500"
      : "border-[#06275A] focus-within:border-blue-500 focus-within:ring-blue-500";

    // Base select classes
    const selectClasses = `
    w-full rounded-lg transition-all duration-200 outline-none cursor-pointer
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${errorClasses}
    ${disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : "focus-within:ring-2 focus-within:ring-opacity-50 hover:border-gray-400"}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

    // Get display text
    const getDisplayText = () => {
      if (multiple) {
        if (multipleValues.length === 0) return placeholder;
        if (multipleValues.length === 1) {
          const option = options.find((opt) => opt.value === multipleValues[0]);
          return option?.label || placeholder;
        }
        return `${multipleValues.length} items selected`;
      } else {
        const option = options.find((opt) => opt.value === value);
        return option?.label || placeholder;
      }
    };

    const displayText = getDisplayText();
    const hasValue = multiple
      ? multipleValues.length > 0
      : value !== undefined && value !== "";

    return (
      <div className={`${fullWidth ? "w-full" : ""} relative`} ref={ref}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-[#06275A] mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Select Container */}
        <div className="relative">
          <div
            className={selectClasses}
            onClick={() => !disabled && setIsOpen(!isOpen)}
          >
            <div className="flex items-center justify-between w-full">
              {/* Display Area */}
              <div className="flex-1 flex items-center gap-2 overflow-hidden">
                {/* Multiple Selection Tags */}
                {multiple &&
                Array.isArray(selectedOptions) &&
                selectedOptions.length > 0 ? (
                  <div className="flex flex-wrap gap-1 flex-1">
                    {selectedOptions.slice(0, 3).map((option) => (
                      <span
                        key={option.value}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs"
                      >
                        {option.label}
                        {!disabled && (
                          <button
                            type="button"
                            onClick={(e) => removeFromMultiple(option.value, e)}
                            className="hover:bg-blue-200 rounded-full p-0.5"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                          </button>
                        )}
                      </span>
                    ))}
                    {selectedOptions.length > 3 && (
                      <span className="text-gray-500 text-sm">
                        +{selectedOptions.length - 3} more
                      </span>
                    )}
                  </div>
                ) : (
                  /* Single Selection or Placeholder */
                  <span
                    className={`truncate ${hasValue ? "text-gray-900" : "text-gray-500"}`}
                  >
                    {displayText}
                  </span>
                )}
              </div>

              {/* Icons */}
              <div className="flex items-center gap-2">
                {loading && (
                  <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full" />
                )}

                {clearable && hasValue && !disabled && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="hover:bg-gray-200 rounded-full p-1 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                )}

                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Dropdown */}
          {isOpen && !disabled && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />
              <div
                className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                style={{ maxHeight }}
              >
                {/* Search Input */}
                {searchable && (
                  <div className="p-2 border-b border-gray-100">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search options..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}

                {/* Options */}
                <div className="overflow-auto" style={{ maxHeight: "200px" }}>
                  {filteredOptions.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
                      No options found
                    </div>
                  ) : (
                    filteredOptions.map((option, index) => {
                      const isSelected = multiple
                        ? multipleValues.includes(option.value)
                        : value === option.value;

                      return (
                        <motion.button
                          key={`${option.value}-${index}`}
                          type="button"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.02 }}
                          onClick={() => handleSelect(option)}
                          disabled={option.disabled}
                          className={`w-full px-4 py-3 text-left text-sm transition-colors duration-150 flex items-center justify-between ${
                            option.disabled
                              ? "text-gray-400 cursor-not-allowed bg-gray-50"
                              : "hover:bg-gray-50 cursor-pointer"
                          } ${
                            isSelected
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          <span className="truncate">{option.label}</span>

                          {/* Multiple selection checkbox */}
                          {multiple && (
                            <div
                              className={`ml-2 w-4 h-4 border-2 rounded ${
                                isSelected
                                  ? "bg-blue-500 border-blue-500"
                                  : "border-gray-300"
                              } flex items-center justify-center`}
                            >
                              {isSelected && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                          )}

                          {/* Single selection indicator */}
                          {!multiple && isSelected && (
                            <svg
                              className="w-4 h-4 text-blue-500 ml-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </motion.button>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Error Message */}
        {hasError && (
          <p className="mt-2 text-sm text-red-600">
            {error || validationError}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !hasError && (
          <p className="mt-2 text-sm text-gray-500">{helperText}</p>
        )}

        {/* Hidden input for form submission */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={multiple ? JSON.stringify(multipleValues) : value || ""}
          />
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;

/** example usages
                * Country Select with Formik 
      
                <Select
                  label="Country (Formik)"
                  name="country"
                  placeholder="Select country"
                  options={countryOptions}
                  value={values.country}
                  onChange={(value, option) => {
                    setFieldValue('country', value);
                    console.log('Formik country:', option);
                  }}
                  error={touched.country && errors.country ? errors.country : undefined}
                  required
                  clearable
                />

                /* Category Select with Formik *
                <Select
                  label="Category (Formik)"
                  name="category"
                  placeholder="Select category"
                  options={categoryOptions}
                  value={values.category}
                  onChange={(value, option) => {
                    setFieldValue('category', value);
                    console.log('Formik category:', option);
                  }}
                  error={touched.category && errors.category ? errors.category : undefined}
                  required
                />

                /* Multiple Skills with Formik 
                <Select
                  label="Skills (Formik Multiple)"
                  name="skills"
                  placeholder="Select skills"
                  options={skillsOptions}
                  multiple
                  multipleValues={values.skills}
                  onMultipleChange={(values, options) => {
                    setFieldValue('skills', values);
                    console.log('Formik skills:', values, options);
                  }}
                  error={touched.skills && errors.skills ? errors.skills : undefined}
                  searchable
                  clearable
                  required
                />

             
                <Select
                  label="Priority (Formik)"
                  name="priority"
                  placeholder="Select priority"
                  options={[
                    { label: "Low Priority", value: "low" },
                    { label: "Medium Priority", value: "medium" },
                    { label: "High Priority", value: "high" },
                    { label: "Urgent", value: "urgent" },
                  ]}
                  value={values.priority}
                  onChange={(value, option) => {
                    setFieldValue('priority', value);
                    console.log('Formik priority:', option);
                  }}
                  error={touched.priority && errors.priority ? errors.priority : undefined}
                  required
                /> */
