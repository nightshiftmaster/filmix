import React from 'react'
import { Link } from 'react-router-dom'

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="shrink-0 w-40 rounded-xl overflow-hidden bg-neutral-800 block"
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
  )
}
