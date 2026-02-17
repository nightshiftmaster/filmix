import React from "react";
import { Link } from "react-router-dom";
import { isRecentKeyboardNavigation } from "../utils/keyboard";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      data-movie-card
      onMouseEnter={(e) => {
        if (document.activeElement?.closest("[data-section='pagination']"))
          return;
        if (!isRecentKeyboardNavigation()) e.currentTarget.focus();
      }}
      onMouseLeave={(e) => e.currentTarget.blur()}
      className="shrink-0 w-[calc((100%-3*0.25rem)/1.1)]  mb-20 focus-within:outline-2 focus-within:outline-cyan-300 focus-within:animate-[tabsFocusPulse_1.4s_ease-in-out_infinite] rounded-xl overflow-hidden bg-neutral-800 block  transition-transform duration-300 origin-center"
    >
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className="w-full aspect-2/3 object-cover"
        />
      ) : (
        <div className="w-full aspect-2/3 bg-neutral-700 flex items-center justify-center text-neutral-500 text-sm">
          Poster not available
        </div>
      )}
      <p
        className="text-white text-xs font-bold p-5 truncate"
        title={movie.title}
      >
        {movie.title}
      </p>
    </Link>
  );
}
