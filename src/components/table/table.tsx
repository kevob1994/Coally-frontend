import { Spinner } from "@components/spiner";

export type Column<T> = {
  Header: string;
  accessor: keyof T | string;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  renderRow: (row: T) => React.ReactNode;
  isLoading?: boolean;
};

export function Table<T>({
  data,
  columns,
  renderRow,
  isLoading,
}: TableProps<T>) {
  return (
    <div className='rounded-t-md'>
      <table className='w-full border-collapse overflow-auto'>
        <thead className='bg-gray-800 text-white h-16'>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className='text-left px-4 py-2'>
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        {!isLoading && (
          <tbody>
            {data?.map((row, rowIndex) => (
              <tr
                className={`hover:bg-gray-200 border-b-1 border-gray-300  ${
                  rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
                key={rowIndex}
              >
                {renderRow(row)}
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {isLoading && (
        <div className="my-10">
          <Spinner />
        </div>
      )}
    </div>
  );
}
