interface TableLoaderProps {
  headers: { name: string; value: string }[];
  rows: number;
}

const TableLoader: React.FC<TableLoaderProps> = ({ headers, rows }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="animate-pulse">
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-4 bg-gray-50">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-100">
                {headers.map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableLoader;