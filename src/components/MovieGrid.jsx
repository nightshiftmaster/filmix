import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPopular } from '../store/movies/actions'
import MovieCard from './MovieCard'
import Pagination from './Pagination'
import { useState } from 'react'

export default function MovieGrid({ category = 'Popular' }) {
  const dispatch = useDispatch()
  const { popular, loading, error } = useSelector((state) => state.movies)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(fetchPopular(currentPage))
  }, [dispatch, currentPage])

  if (loading) return <p className="text-white p-4">Loading...</p>
  if (error) return <p className="text-red-400 p-4">Error: {error}</p>

  const movies = popular?.movies ?? []

  return (
    <div className="w-full flex flex-col gap-10 md:px-20 px-2-mt-7  mb-30 ">
      <div className="p-10 ">
        <h2 className="text-4xl text-left font-bold text-white mb-4">
          {category}
        </h2>
        <div className="flex gap-10 md:flex-wrap  overflow-y-auto pb-2">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      <Pagination
        setCurrentPage={setCurrentPage}
        pagesCount={popular?.totalPages}
      />
    </div>
  )
}
