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