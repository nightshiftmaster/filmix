import React, { memo, useEffect, useRef } from "react";
import {
  handlePaginationKeyDown,
  markKeyboardNavigation,
} from "../utils/keyboard";

function Pagination({ currentPage, setCurrentPage, pagesCount }) {
  const PAGES_PER_BLOCK = 5;
  const totalPages = pagesCount ?? 0;
  const navRef = useRef(null);
  const shouldRestoreFocusRef = useRef(false);
  const startPage =
    Math.floor((currentPage - 1) / PAGES_PER_BLOCK) * PAGES_PER_BLOCK + 1;
  const endPage = Math.min(startPage + PAGES_PER_BLOCK - 1, totalPages);
  const visiblePages = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
    (_, i) => startPage + i,
  );

  const goTo = (page, restoreFocus = false) => {
    const next = Math.max(1, Math.min(totalPages, page));
    if (next === currentPage) return;
    shouldRestoreFocusRef.current = restoreFocus;
    setCurrentPage(next);
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      ref={navRef}
      data-section="pagination"
      className="flex flex-wrap m-auto w-fit rounded-md justify-center items-center gap-1 md:gap-2 focus-within:outline-2 focus-within:outline-cyan-300 focus-within:animate-[tabsFocusPulse_1.2s_ease-in-out_infinite]"
      aria-label="Pagination"
      onKeyDown={handlePaginationKeyDown}
      onFocus={() => markKeyboardNavigation()}
    >
      <button
        type="button"
        className="font-bold rounded-md border border-gray-800 disabled:opacity-50 hover:bg-gray-500 px-2 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-white"
        disabled={currentPage === 1}
        onClick={() => goTo(currentPage - 1, true)}
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
          onClick={() => goTo(page, true)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
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
        disabled={currentPage === totalPages}
        onClick={() => goTo(currentPage + 1, true)}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}

export default memo(Pagination);
