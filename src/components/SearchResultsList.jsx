import React from "react";
import { Link } from "react-router-dom";

export default function SearchResultsList({
  loading,
  moviesList,
  activeIndex,
  onClose,
}) {
  return (
    <>
      <div
        className="fixed inset-0 z-50 w-screen h-screen"
        onClick={onClose}
      ></div>
      <ul
        className="absolute left-0 right-0 z-10 p-2 top-full mt-1 max-h-80 overflow-y-auto rounded-xl bg-slate-900 shadow-xl border border-neutral-700"
        onClick={onClose}
      >
        {loading ? (
          <li className="p-4 text-white/60 text-center">Searching…</li>
        ) : moviesList.length === 0 ? (
          <li className="p-4 text-white/60 text-center">No results</li>
        ) : (
          moviesList.map((movie, index) => (
            <li key={movie.id}>
              <Link
                to={`/movie/${movie.id}`}
                className={`flex gap-3 p-2 rounded-lg items-center ${
                  index === activeIndex
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                <span className="text-white font-medium truncate">
                  {movie.title}
                </span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
