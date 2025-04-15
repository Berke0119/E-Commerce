import { useState } from 'react';

const ShopPagination = ({ total, limit, offset, onPageChange }) => {
  const [pageBlockStart, setPageBlockStart] = useState(1); // baştaki sayfa

  const totalPages = Math.ceil(total / limit);
  const currentPage = offset / limit + 1;

  const handleFirst = () => {
    setPageBlockStart(1);
    onPageChange(1);
  };

  const handleNextBlock = () => {
    const newStart = pageBlockStart + 3;
    if (newStart <= totalPages) {
      setPageBlockStart(newStart);
      onPageChange(newStart);
    }
  };

  const visiblePages = Array.from({ length: 3 }, (_, i) => pageBlockStart + i)
    .filter((pageNum) => pageNum <= totalPages);

  return (
    <div className="flex justify-center mt-10">
      <div className="flex border rounded overflow-hidden shadow-sm">
        <button
          onClick={handleFirst}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-sm border-r ${
            currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-100'
          }`}
        >
          First
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 text-sm border-r ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNextBlock}
          disabled={pageBlockStart + 3 > totalPages}
          className={`px-4 py-2 text-sm ${
            pageBlockStart + 3 > totalPages ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-100'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShopPagination;
