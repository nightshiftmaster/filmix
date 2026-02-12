import React from "react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  pagesCount,
}) {
  if (!pagesCount) return null;

  const pagesPerBlock = 5;
  const startPage =
    Math.floor((currentPage - 1) / pagesPerBlock) * pagesPerBlock + 1;
  const endPage = Math.min(startPage + pagesPerBlock - 1, pagesCount);
  const visiblePages = [...Array(endPage - startPage + 1)].map(
    (_, i) => startPage + i,
  );

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        className="px-4 py-2 font-bold rounded-md border border-gray-800 text-white disabled:opacity-50"
        disabled={startPage <= 1}
        onClick={() => setCurrentPage(Math.max(1, startPage - pagesPerBlock))}
      >
        Previous
      </button>
      {visiblePages.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 font-bold rounded-md border border-gray-800 ${page === currentPage ? "bg-white text-black" : "bg-gray-800 text-white hover:bg-gray-500"}`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-4 py-2 font-bold rounded-md border border-gray-800 text-white disabled:opacity-50 "
        disabled={endPage >= pagesCount}
        onClick={() =>
          setCurrentPage(Math.min(pagesCount, startPage + pagesPerBlock))
        }
      >
        Next
      </button>
    </div>
  );
}
