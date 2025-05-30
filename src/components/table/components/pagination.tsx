import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  const getVisiblePages = useMemo(() => {
    const delta = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages = [];

    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push("...");
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-end space-x-2 pb-4">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200 ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            : "bg-white text-[#06275A] border-gray-300 hover:bg-gray-50 hover:border-gray-400"
        }`}
      >
        <ArrowLeft2 size="18" color="#06275A" /> Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {getVisiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-400"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 text-sm font-medium rounded-full transition-all duration-200 ${
                isActive
                  ? "bg-[#06275A] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200 ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            : "bg-white text-[#06275A] border-gray-300 hover:bg-gray-50 hover:border-gray-400"
        }`}
      >
        <span>Next</span> <ArrowRight2 size="18" color="#06275A" />
      </button>
    </div>
  );
};

export default Pagination;
