import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoHeartOutline } from 'react-icons/io5'
import { fetchMovies } from '../store/movies/actions'
import { selectListState } from '../store/movies/selectors'
import { handleMoviesKeyboardNavigation } from '../utils/keyboard'
import MovieCard from './MovieCard'
import Skeleton from './Skeleton'
import Pagination from './Pagination'

export default function MovieGrid({
  category = 'Popular',
  filterId = 'popular',
}) {
  const dispatch = useDispatch()
  const { movies, loading, error, totalPages } = useSelector((state) =>
    selectListState(state, filterId)
  )
  const [currentPage, setCurrentPage] = useState(1)
  const isFavorites = filterId === 'favorites'

  useEffect(() => {
    if (!isFavorites) {
      dispatch(fetchMovies(currentPage, filterId))
    }
  }, [dispatch, currentPage, filterId, isFavorites])

  if (error) return <p className="text-red-400 p-4">Error: {error}</p>

  const skeletonCount = 15

  return (
    <div className="w-full flex flex-col gap-10 md:px-20 px-2-mt-7  mb-30 ">
      <div className="p-10 ">
        <h2 className="md:text-4xl  text-2xl md:text-left text-center font-bold text-white mb-4">
          {category}
        </h2>
        <div
          className="flex gap-5 justify-start md:flex-wrap overflow-y-auto pb-2 pt-4 px-3"
          onKeyDown={handleMoviesKeyboardNavigation}
        >
          {loading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <Skeleton key={i} />
              ))
            : movies?.length > 0
              ? movies.map((movie) => (
                  <div key={movie.id} className="p-3 -m-3">
                    <MovieCard movie={movie} />
                  </div>
                ))
              : isFavorites && (
                  <div className="flex flex-col items-center justify-center gap-4 w-full py-12">
                    <IoHeartOutline
                      className="text-white/50 w-16 h-16"
                      aria-hidden
                    />
                    <p className="text-white/70 text-lg text-center">
                      No favorites yet. Add movies from their detail page.
                    </p>
                  </div>
                )}
        </div>
      </div>
      {!loading && !isFavorites && (
        <Pagination setCurrentPage={setCurrentPage} pagesCount={totalPages} />
      )}
    </div>
  )
}
