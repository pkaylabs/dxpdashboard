import React, { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

// Close Icon
const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Warning Icon
const WarningIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// Success Icon
const SuccessIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
);

// Info Icon
const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// Error Icon
const ErrorIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

export interface ModalAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger" | "success" | "warning";
  disabled?: boolean;
  loading?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  actions?: ModalAction[];
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  type?: "default" | "confirmation" | "success" | "warning" | "error" | "info";
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  persistent?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  animation?:
    | "fade"
    | "scale"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right";
  zIndex?: number;
  autoFocus?: boolean;
  icon?: React.ReactNode;
  description?: string;
  maxHeight?: string;
  scrollable?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  actions = [],
  size = "md",
  type = "default",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  persistent = false,
  className = "",
  overlayClassName = "",
  contentClassName = "",
  animation = "scale",
  zIndex = 50,
  autoFocus = true,
  icon,
  description,
  maxHeight = "90vh",
  scrollable = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape && !persistent) {
        onClose();
      }
    },
    [closeOnEscape, onClose, persistent]
  );

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      if (
        event.target === event.currentTarget &&
        closeOnBackdropClick &&
        !persistent
      ) {
        onClose();
      }
    },
    [closeOnBackdropClick, onClose, persistent]
  );

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;

      if (autoFocus && modalRef.current) {
        const focusableElement = modalRef.current.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;

        if (focusableElement) {
          focusableElement.focus();
        } else {
          modalRef.current.focus();
        }
      }
    } else {
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen, autoFocus]);

  // Add/remove event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscape]);

  // Size classes
  const sizeClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full mx-4",
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.75 },
      visible: { opacity: 1, scale: 1 },
    },
    "slide-up": {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    "slide-down": {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 },
    },
    "slide-left": {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-right": {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
  };

  // Type configurations
  const typeConfig = {
    default: { iconColor: "text-gray-500", bgColor: "bg-gray-50" },
    confirmation: { iconColor: "text-blue-500", bgColor: "bg-blue-50" },
    success: { iconColor: "text-green-500", bgColor: "bg-green-50" },
    warning: { iconColor: "text-yellow-500", bgColor: "bg-yellow-50" },
    error: { iconColor: "text-red-500", bgColor: "bg-red-50" },
    info: { iconColor: "text-blue-500", bgColor: "bg-blue-50" },
  };

  // Default icons for types
  const getDefaultIcon = () => {
    switch (type) {
      case "success":
        return (
          <SuccessIcon className={`w-6 h-6 ${typeConfig[type].iconColor}`} />
        );
      case "warning":
      case "confirmation":
        return (
          <WarningIcon className={`w-6 h-6 ${typeConfig[type].iconColor}`} />
        );
      case "error":
        return (
          <ErrorIcon className={`w-6 h-6 ${typeConfig[type].iconColor}`} />
        );
      case "info":
        return <InfoIcon className={`w-6 h-6 ${typeConfig[type].iconColor}`} />;
      default:
        return null;
    }
  };

  // Action button styles
  const getActionButtonStyles = (
    variant: ModalAction["variant"] = "secondary"
  ) => {
    const baseStyles =
      "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50";

    switch (variant) {
      case "primary":
        return `${baseStyles} bg-primary text-white hover:bg-primary-600 focus:ring-primary`;
      case "danger":
        return `${baseStyles} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`;
      case "success":
        return `${baseStyles} bg-green-600 text-white hover:bg-green-700 focus:ring-green-500`;
      case "warning":
        return `${baseStyles} bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500`;
      default:
        return `${baseStyles} bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500`;
    }
  };

  // Render modal content
  const renderModalContent = () => (
    <motion.div
      ref={modalRef}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={modalVariants[animation]}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`
        relative bg-white rounded-lg shadow-2xl w-full mx-4 overflow-hidden
        ${sizeClasses[size]}
        ${contentClassName}
      `}
      style={{ maxHeight }}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-description" : undefined}
    >
      {(title || showCloseButton || icon) && (
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {(icon || getDefaultIcon()) && (
              <div className={`p-2 rounded-full ${typeConfig[type].bgColor}`}>
                {icon || getDefaultIcon()}
              </div>
            )}
            <div>
              {title && (
                <h3
                  id="modal-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  {title}
                </h3>
              )}
              {description && (
                <p
                  id="modal-description"
                  className="text-sm text-gray-600 mt-1"
                >
                  {description}
                </p>
              )}
            </div>
          </div>

          {showCloseButton && !persistent && (
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              aria-label="Close modal"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {children && (
        <div
          className={`p-6 ${scrollable ? "overflow-y-auto" : ""}`}
          style={{ maxHeight: scrollable ? "calc(90vh - 200px)" : undefined }}
        >
          {children}
        </div>
      )}

      {(footer || actions.length > 0) && (
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          {footer || (
            <>
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  disabled={action.disabled || action.loading}
                  className={`
                    ${getActionButtonStyles(action.variant)}
                    ${action.disabled || action.loading ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {action.loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>{action.label}</span>
                    </div>
                  ) : (
                    action.label
                  )}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </motion.div>
  );

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        transition={{ duration: 0.2 }}
        className={`
          fixed inset-0 flex items-center justify-center p-4
          ${overlayClassName}
        `}
        style={{ zIndex }}
        onClick={handleBackdropClick}
      >
        <div className="absolute inset-0 bg-[#00000029] backdrop-blur-xs" />

        <div className={`relative ${className}`}>{renderModalContent()}</div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
