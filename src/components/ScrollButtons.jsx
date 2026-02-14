import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const btnClass =
  "md:hidden absolute top-[40%] -translate-y-1/2 z-10 w-8 h-24 flex items-center justify-center bg-neutral-800/95 hover:bg-neutral-700 rounded-2xl shadow-md text-white transition-colors";

export default function ScrollButtons({ onScrollLeft, onScrollRight }) {
  return (
    <>
      <button
        type="button"
        onClick={onScrollLeft}
        aria-label="Scroll left"
        className={`-left-6 ${btnClass}`}
      >
        <IoChevronBack className="w-7 h-7" />
      </button>
      <button
        type="button"
        onClick={onScrollRight}
        aria-label="Scroll right"
        className={`-right-10 ${btnClass}`}
      >
        <IoChevronForward className="w-7 h-7" />
      </button>
    </>
  );
}
