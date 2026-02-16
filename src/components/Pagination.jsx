import React, { memo, useMemo } from "react";
import {
  handlePaginationKeyDown,
  markKeyboardNavigation,
} from "../utils/keyboard";

function Pagination({ currentPage, setCurrentPage, pagesCount }) {
  const PAGES_PER_BLOCK = 5;
  if (!pagesCount || pagesCount <= 1) return null;

  const { visiblePages, endPage } = useMemo(() => {
    const startPage =
      Math.floor((currentPage - 1) / PAGES_PER_BLOCK) * PAGES_PER_BLOCK + 1;
    const endPage = Math.min(startPage + PAGES_PER_BLOCK - 1, pagesCount);

    const visiblePages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
    return { visiblePages, endPage };
  }, [currentPage, pagesCount]);

  const goTo = (page) => {
    const next = Math.max(1, Math.min(pagesCount, page));
    if (next !== currentPage) setCurrentPage(next);
  };

  return (
    <nav
      data-section="pagination"
      className="flex flex-wrap justify-center items-center gap-1 md:gap-2"
      aria-label="Pagination"
      onKeyDown={handlePaginationKeyDown}
      onFocus={() => markKeyboardNavigation()}
    >
      <button
        type="button"
        className="font-bold rounded-md border border-gray-800 disabled:opacity-50 hover:bg-gray-500 px-2 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-white"
        disabled={currentPage === 1}
        onClick={() => goTo(currentPage - 1)}
        aria-label="Previous page"
      >
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          type="button"
          className={`min-w-9 md:min-w-0 font-bold rounded-md border border-gray-800 hover:bg-gray-500 px-2 py-1.5 md:px-4 md:py-2 text-sm md:text-base ${
            page === currentPage
              ? "bg-white text-black"
              : "bg-gray-800 text-white"
          }`}
          onClick={() => goTo(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {endPage < pagesCount && (
        <span
          className="px-0.5 md:px-1 text-white/70 text-base md:text-lg font-bold"
          aria-hidden="true"
        >
          …
        </span>
      )}

      <button
        type="button"
        className="font-bold rounded-md border border-gray-800 disabled:opacity-50 hover:bg-gray-500 px-2 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-white"
        disabled={currentPage === pagesCount}
        onClick={() => goTo(currentPage + 1)}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}

export default memo(Pagination);
