import { Link } from "react-router-dom";
import React from "react";

export default function SearchResultsList({ loading, moviesList }) {
  return (
    <ul className="absolute left-0 right-0 p-2  top-full mt-1 max-h-80 overflow-y-auto rounded-xl bg-slate-900 shadow-xl border border-neutral-700">
      {loading ? (
        <li className="p-4 text-white/60 text-center">Searching…</li>
      ) : moviesList.length === 0 ? (
        <li className="p-4 text-white/60 text-center">No results</li>
      ) : (
        moviesList.map((movie) => (
          <li key={movie.id}>
            <Link
              to={`/movie/${movie.id}`}
              className="flex gap-3 p-2 rounded-lg hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none items-center"
            >
              <span className="text-white font-medium truncate">
                {movie.title}
              </span>
            </Link>
          </li>
        ))
      )}
    </ul>
  );
}
