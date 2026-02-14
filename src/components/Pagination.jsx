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
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const goTo = (page) =>
    setCurrentPage(Math.max(1, Math.min(pagesCount, page)));

  return (
    <div
      className="flex justify-center items-center gap-2"
      role="navigation"
      aria-label="Pagination"
    >
      <button
        className="px-4 py-2 font-bold rounded-md border border-gray-800 text-white disabled:opacity-50 hover:bg-gray-500"
        disabled={currentPage === 1}
        onClick={() => goTo(currentPage - 1)}
      >
        Previous
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 font-bold rounded-md border border-gray-800 ${
            page === currentPage
              ? "bg-white text-black"
              : "bg-gray-800 text-white hover:bg-gray-500"
          }`}
          onClick={() => goTo(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {endPage < pagesCount && (
        <span
          className="px-1 text-white/70 text-lg font-bold"
          aria-hidden="true"
        >
          …
        </span>
      )}

      <button
        className="px-4 py-2 font-bold rounded-md border border-gray-800 text-white disabled:opacity-50 hover:bg-gray-500"
        disabled={currentPage === pagesCount}
        onClick={() => goTo(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
