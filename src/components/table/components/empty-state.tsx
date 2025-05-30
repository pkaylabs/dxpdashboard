import { FolderAdd } from "iconsax-react";
import { ReactNode } from "react";

interface EmptyStateProps {
  onAdd?: () => void;
  message?: string;
  showAddButton?: boolean;
  icon?: ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  onAdd,
  message = "No data available at the moment.",
  showAddButton = true,
  icon
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      {showAddButton && (
        <button
          onClick={onAdd}
          className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 hover:bg-gray-200 hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          {icon || <FolderAdd size="40" variant="Bulk" color="#6B7280" />}
        </button>
      )}
      <div className="space-y-2">
        <p className="text-lg font-medium text-gray-600">{message}</p>
        {showAddButton && onAdd && (
          <p className="text-sm text-gray-400">Click the icon above to get started</p>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
