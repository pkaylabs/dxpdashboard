export const ActionButtons = ({
  onEdit,
  onDelete,
  editText = "Edit",
  deleteText = "Delete",
}: {
  onEdit: () => void;
  onDelete: () => void;
  editText?: string;
  deleteText?: string;
}) => {
  return (
    <div className="font-inter flex items-center space-x-2">
      <button
        onClick={onEdit}
        className="px-5 py-2 bg-green-600 cursor-pointer text-white text-sm font-medium rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition-all duration-200"
      >
        {editText}
      </button>
      <button
        onClick={onDelete}
        className="px-5 py-2 bg-red-600 cursor-pointer text-white text-sm font-medium rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all duration-200"
      >
        {deleteText}
      </button>
    </div>
  );
};

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "@/components/elements/input";
import Avatar from "@/components/core/avatar";

const MoreVerticalIcon = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

// Action icons
const ViewIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EditIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DeleteIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3,6 5,6 21,6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export interface ActionItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger" | "success" | "warning";
  disabled?: boolean;
  divider?: boolean; // Add divider after this item
}

interface ActionDropdownProps {
  actions?: ActionItem[];
  // Quick setup props for common actions
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onArchive?: () => void;
  // Customization
  className?: string;
  disabled?: boolean;
  placement?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  size?: "small" | "medium" | "large";
  variant?: "default" | "ghost" | "outline";
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  actions,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  onArchive,
  className = "",
  disabled = false,
  placement = "bottom-right",
  size = "medium",
  variant = "default",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Default actions if not provided
  const defaultActions: ActionItem[] = [
    ...(onView
      ? [
          {
            id: "view",
            label: "View Details",
            icon: <ViewIcon className="text-blue-500" />,
            onClick: onView,
            variant: "default" as const,
          },
        ]
      : []),
    ...(onEdit
      ? [
          {
            id: "edit",
            label: "Edit",
            icon: <EditIcon className="text-green-500" />,
            onClick: onEdit,
            variant: "success" as const,
          },
        ]
      : []),
    ...(onDuplicate
      ? [
          {
            id: "duplicate",
            label: "Duplicate",
            icon: <EditIcon className="text-blue-500" />,
            onClick: onDuplicate,
            variant: "default" as const,
          },
        ]
      : []),
    ...(onArchive
      ? [
          {
            id: "archive",
            label: "Archive",
            icon: <EditIcon className="text-orange-500" />,
            onClick: onArchive,
            variant: "warning" as const,
            divider: true,
          },
        ]
      : []),
    ...(onDelete
      ? [
          {
            id: "delete",
            label: "Delete",
            icon: <DeleteIcon className="text-red-500" />,
            onClick: onDelete,
            variant: "danger" as const,
          },
        ]
      : []),
  ];

  const finalActions = actions || defaultActions;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle action click
  const handleActionClick = (action: ActionItem) => {
    if (action.disabled) return;

    action.onClick();
    setIsOpen(false);
  };

  // Button size classes
  const sizeClasses = {
    small: "w-6 h-6 p-1",
    medium: "w-8 h-8 p-1.5",
    large: "w-10 h-10 p-2",
  };

  // Button variant classes
  const variantClasses = {
    default: "bg-gray-100 hover:bg-gray-200 text-gray-600",
    ghost: "hover:bg-gray-100 text-gray-500",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-600",
  };

  // Placement classes
  const placementClasses = {
    "bottom-left": "top-full left-0 mt-1",
    "bottom-right": "top-full right-0 mt-1",
    "top-left": "bottom-full left-0 mb-1",
    "top-right": "bottom-full right-0 mb-1",
  };

  // Action variant styles
  const getActionVariantClasses = (actionVariant: ActionItem["variant"]) => {
    switch (actionVariant) {
      case "danger":
        return "hover:bg-red-50 hover:text-red-700 focus:bg-red-50";
      case "success":
        return "hover:bg-green-50 hover:text-green-700 focus:bg-green-50";
      case "warning":
        return "hover:bg-orange-50 hover:text-orange-700 focus:bg-orange-50";
      default:
        return "hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50";
    }
  };

  if (finalActions.length === 0) {
    return null;
  }

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${isOpen ? "bg-gray-200" : ""}
        `}
        aria-label="More actions"
        aria-expanded={isOpen}
      >
        <MoreVerticalIcon className="w-full h-full" />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className={`
                absolute z-20 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1
                ${placementClasses[placement]}
              `}
            >
              {finalActions.map((action, index) => (
                <div key={action.id}>
                  <button
                    onClick={() => handleActionClick(action)}
                    disabled={action.disabled}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-150
                      ${
                        action.disabled
                          ? "text-gray-400 cursor-not-allowed"
                          : `text-gray-700 cursor-pointer ${getActionVariantClasses(action.variant)}`
                      }
                    `}
                  >
                    {action.icon && (
                      <span className="flex-shrink-0">{action.icon}</span>
                    )}
                    <span className="flex-1">{action.label}</span>
                  </button>

                  {/* Divider */}
                  {action.divider && index < finalActions.length - 1 && (
                    <div className="border-t border-gray-100 my-1" />
                  )}
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * 
 * basic example 
 *   <ActionDropdown
      onView={() => handleView({ name: 'Kontiki Park & Resort' })}
      onEdit={() => handleEdit({ name: 'Kontiki Park & Resort' })}
      onDelete={() => handleDelete({ name: 'Kontiki Park & Resort' })}
      />



      With All Actions
  <ActionDropdown
        onView={() => handleView({ name: 'Oxbow Lake' })}
        onEdit={() => handleEdit({ name: 'Oxbow Lake' })}
        onDuplicate={() => handleDuplicate({ name: 'Oxbow Lake' })}
        onArchive={() => handleArchive({ name: 'Oxbow Lake' })}
        onDelete={() => handleDelete({ name: 'Oxbow Lake' })}
      />


    Custom Actions
    <ActionDropdown
      actions={[
        {
          id: 'view',
          label: 'View Details',
          icon: <span>👁️</span>,
          onClick: () => handleView({ name: 'De Gracious Event Centre' }),
        },
        {
          id: 'share',
          label: 'Share Location',
          icon: <span>🔗</span>,
          onClick: () => console.log('Share location'),
        },
        {
          id: 'edit',
          label: 'Edit Venue',
          icon: <span>✏️</span>,
          onClick: () => handleEdit({ name: 'De Gracious Event Centre' }),
          variant: 'success',
        },
        {
          id: 'report',
          label: 'Report Issue',
          icon: <span>⚠️</span>,
          onClick: () => console.log('Report issue'),
          variant: 'warning',
          divider: true,
        },
        {
          id: 'delete',
          label: 'Delete Venue',
          icon: <span>🗑️</span>,
          onClick: () => handleDelete({ name: 'De Gracious Event Centre' }),
          variant: 'danger',
        },
      ]}
    />
 */

export default ActionDropdown;

export const ProfilePictureSection = ({
  values,
  setFieldValue,
  touched,
  errors,
  auth,
}: {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  touched: any;
  errors: any;
  auth?: any;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (values.profilePicture instanceof File) {
      setIsLoading(true);
      const url = URL.createObjectURL(values.profilePicture);
      setPreviewUrl(url);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => {
        URL.revokeObjectURL(url);
        clearTimeout(timer);
      };
    } else {
      setPreviewUrl(null);
      setIsLoading(false);
    }
  }, [values.profilePicture]);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setIsLoading(true);
    }
    setFieldValue("profilePicture", file);
  };

  const handleRemovePicture = () => {
    setFieldValue("profilePicture", null);
    setPreviewUrl(null);
  };

  const getAvatarSrc = () => {
    if (isLoading) return null;
    if (previewUrl) return previewUrl;
    if (typeof values.profilePicture === "string") return values.profilePicture;
    // if (auth.user?.avatar) return auth.user.avatar;
    return null;
  };

  return (
    <div className="flex gap-4 lg:max-w-[70%] mt-3">
      <div className="relative size-20">
        <Avatar src={getAvatarSrc()} alt={auth?.user ?? "NA"} size="lg" />

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-[#0000001f] rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Change indicator */}
        {previewUrl && !isLoading && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
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
          </div>
        )}

        {/* Upload status indicator */}
        {values.profilePicture && (
          <div className="absolute -top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-2 h-2 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1">
        <Input
          name="profilePicture"
          type="file"
          label="Profile Picture"
          acceptedFileTypes="image/jpeg,image/png,image/gif"
          maxFileSize={5}
          filePreview
          onFileChange={handleFileChange}
          error={
            touched.profilePicture && errors.profilePicture
              ? errors.profilePicture
              : undefined
          }
          helperText="Upload a profile picture (max 5MB)."
          fullWidth
        />

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-3">
          {values.profilePicture && (
            <button
              type="button"
              onClick={handleRemovePicture}
              className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200 font-medium"
            >
              Remove picture
            </button>
          )}

          {previewUrl && (
            <span className="text-sm text-green-600 font-medium">
              ✓ New image selected
            </span>
          )}
        </div>

        {/* Image info */}
        {values.profilePicture instanceof File && (
          <div className="mt-2 p-2 bg-blue-50 rounded-md">
            <div className="text-xs text-blue-800">
              <div className="font-medium">{values.profilePicture.name}</div>
              <div className="text-blue-600">
                {(values.profilePicture.size / 1024 / 1024).toFixed(2)} MB •{" "}
                {values.profilePicture.type}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
