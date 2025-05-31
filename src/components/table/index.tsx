import { motion } from "framer-motion";
import SearchBar from "./components/search";
import TableLoader from "./components/loader";
import EmptyState from "./components/empty-state";
import Pagination from "./components/pagination";
import FilterDropdown from "./components/filter-dropdown";
import React, { ReactNode, useCallback, useMemo, useState } from "react";

interface Header {
  name: string;
  value: string;
  sortable?: boolean;
  width?: string;
}

interface FilterOption {
  name: string;
  fields: string[];
}

interface TableProps {
  displayHeader?: boolean;
  showAddButton?: boolean;
  addButtonText?: string;
  onAddButtonClick?: () => void;
  headers?: Header[];
  rows: Array<{ [key: string]: ReactNode }>;
  footer?: ReactNode;
  maxRows?: number;
  searchable?: boolean;
  searchableFields?: string[];
  filters?: FilterOption[];
  loading?: boolean;
  renderRow?: (row: { [key: string]: ReactNode }, index: number) => ReactNode;
  emptyStateMessage?: string;
  emptyStateIcon?: ReactNode;
  onRowClick?: (row: { [key: string]: ReactNode }, index: number) => void;
  stickyHeader?: boolean;
  striped?: boolean;
}

const Table: React.FC<TableProps> = ({
  displayHeader = true,
  showAddButton = false,
  addButtonText = "Add New",
  onAddButtonClick,
  headers = [],
  rows = [],
  footer,
  maxRows = 10,
  searchable = true,
  searchableFields = [],
  filters = [],
  loading = false,
  renderRow,
  emptyStateMessage,
  emptyStateIcon,
  onRowClick,
  stickyHeader = false,
  striped = true,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (searchQuery && searchableFields.length > 0) {
        const matchesSearch = searchableFields.some((field) =>
          String(row[field] || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
        if (!matchesSearch) return false;
      }

      // Dropdown filters
      for (const [field, value] of Object.entries(activeFilters)) {
        if (
          value &&
          String(row[field] || "").toLowerCase() !== value.toLowerCase()
        ) {
          return false;
        }
      }

      return true;
    });
  }, [rows, searchQuery, searchableFields, activeFilters]);

  const totalPages = Math.ceil(filteredRows.length / maxRows);
  const paginatedRows = useMemo(() => {
    return filteredRows.slice(
      (currentPage - 1) * maxRows,
      currentPage * maxRows
    );
  }, [filteredRows, currentPage, maxRows]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilters]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const handleFilterChange = useCallback(
    (filterName: string, value: string) => {
      setActiveFilters((prev) => ({ ...prev, [filterName]: value }));
    },
    []
  );

  const formatNumber = (value: number): string => {
    return value.toLocaleString();
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header Controls */}
      <div className="bg-white rounded-lg p-4 mb-3 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {searchable && (
              <SearchBar
                query={searchQuery}
                onChange={setSearchQuery}
                disabled={loading}
                placeholder={`Search ${searchableFields.length > 0 ? searchableFields.join(", ") : ""}...`}
              />
            )}

            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {filters.map((filter) => (
                <FilterDropdown
                  key={filter.name}
                  name={filter.name}
                  options={filter.fields}
                  onChange={(value) => handleFilterChange(filter.name, value)}
                  disabled={loading}
                />
              ))}
            </div>
          </div>

          {showAddButton && (
            <button
              onClick={onAddButtonClick}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-[#06275A] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <span>+</span>
              <span className="whitespace-nowrap">{addButtonText}</span>
            </button>
          )}
        </div>

        {/* Results Summary */}
        {!loading && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {formatNumber(paginatedRows.length)} of{" "}
            {formatNumber(filteredRows.length)} results
            {filteredRows.length !== rows.length &&
              ` (filtered from ${formatNumber(rows.length)} total)`}
          </div>
        )}
      </div>

      {/* Table Content */}
      {loading ? (
        <TableLoader headers={headers} rows={maxRows} />
      ) : filteredRows.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <EmptyState
            onAdd={onAddButtonClick}
            message={
              emptyStateMessage ||
              (searchQuery || Object.keys(activeFilters).length > 0
                ? "No results found. Try adjusting your search or filters."
                : "No data available at the moment.")
            }
            showAddButton={showAddButton}
            icon={emptyStateIcon}
          />
        </div>
      ) : (
        <div className="bg-white rounded-b-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Header */}
              {displayHeader && (
                <thead className={stickyHeader ? "sticky top-0 z-10" : ""}>
                  <tr className="border-b-[0.5px] border-gray-200 ">
                    {headers.map((header) => (
                      <th
                        key={header.value}
                        className="px-6 py-4 text-left text-base text-nowrap font-semibold text-[#06275A]"
                        style={{ width: header.width }}
                      >
                        {header.name}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}

              {/* Body */}
              <tbody>
                {paginatedRows.map((row, index) =>
                  renderRow ? (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => onRowClick?.(row, index)}
                      className={`border-b border-gray-100 transition-colors duration-150 ${
                        striped && index % 2 === 1 ? "bg-gray-50" : "bg-white"
                      } ${onRowClick ? "hover:bg-blue-50 cursor-pointer" : ""}`}
                    >
                      {/* ✅ Single td that spans all columns */}
                      <td colSpan={headers.length} className="p-0">
                        {renderRow(row, index)}
                      </td>
                    </motion.tr>
                  ) : (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => onRowClick?.(row, index)}
                      className={`border-b border-gray-100 transition-colors duration-150 ${
                        striped && index % 2 === 1 ? "bg-gray-50" : "bg-white"
                      } ${onRowClick ? "hover:bg-blue-50 cursor-pointer" : ""}`}
                    >
                      {headers.map((header) => (
                        <td key={header.value} className="px-6 py-2.5 text-sm ">
                          {row[header.value]}
                        </td>
                      ))}
                    </motion.tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              {footer}
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.max(1, totalPages)}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </motion.div>
  );
};

export default Table;
