import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../store/movies/actions'
import { selectListState } from '../store/movies/selectors'
import MovieCard from './MovieCard'
import MovieSkeleton from './MovieSkeleton'
import Pagination from './Pagination'

export default function MovieGrid({
  category = 'Popular',
  filterId = 'popular',
}) {
  const dispatch = useDispatch()
  const { movies, loading, error, totalPages } = useSelector(selectListState)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(fetchMovies(currentPage, filterId))
  }, [dispatch, currentPage, filterId])

  if (error) return <p className="text-red-400 p-4">Error: {error}</p>

  const skeletonCount = 15

  return (
    <div className="w-full flex flex-col gap-10 md:px-20 px-2-mt-7  mb-30 ">
      <div className="p-10 ">
        <h2 className="md:text-4xl  text-2xl md:text-left text-center font-bold text-white mb-4">
          {category}
        </h2>
        <div className="flex gap-10 md:flex-wrap  overflow-y-auto pb-2">
          {loading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <MovieSkeleton key={i} />
              ))
            : movies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
        </div>
      </div>
      {!loading && (
        <Pagination setCurrentPage={setCurrentPage} pagesCount={totalPages} />
      )}
    </div>
  )
}
