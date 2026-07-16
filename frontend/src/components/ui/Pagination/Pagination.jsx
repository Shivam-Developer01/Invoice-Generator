function Pagination({
  currentPage,
  totalPages,
  totalDocuments,
  limit,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}) {
  if (!totalDocuments) return null;

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalDocuments);

  return (
    <div className="app-pagination">

      <div className="pagination-info">
        Showing <strong>{start}</strong> - <strong>{end}</strong> of{" "}
        <strong>{totalDocuments}</strong>
      </div>

      <div className="pagination-controls">

        <button
          className="btn btn-outline-secondary"
          disabled={!hasPreviousPage}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>

        <span className="pagination-page">

          Page {currentPage} of {totalPages}

        </span>

        <button
          className="btn btn-outline-secondary"
          disabled={!hasNextPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default Pagination;