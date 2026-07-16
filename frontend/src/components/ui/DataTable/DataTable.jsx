import EmptyState from "../EmptyState/EmptyState";
import TableSkeleton from "../TableSkeleton/TableSkeleton";
import "./DataTable.css"

function DataTable({
  columns = [],
  data = [],
  loading = false,

  emptyTitle = "No Data Found",

  emptyDescription = "There is nothing to display.",

  onRowClick,

  footer = null,
}) {
  if (loading) {
    return <TableSkeleton columns={columns.length} />;
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="app-table-wrapper">
      <table className="table app-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.header}>{column.header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={row._id || index}

              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td key={column.header}>
                  {column.render ? column.render(row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {footer}
    </div>
  );
}

export default DataTable;
