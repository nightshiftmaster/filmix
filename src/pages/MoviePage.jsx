import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchMovieDetails,
  addFavorite,
  removeFavorite,
} from '../store/movies/actions'
import { selectDetailsData, selectIsFavorite } from '../store/movies/selectors'

export default function MoviePage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector(selectDetailsData)
  const isFavorite = useSelector((state) => selectIsFavorite(state, data?.id))

  useEffect(() => {
    if (id) dispatch(fetchMovieDetails(Number(id)))
  }, [dispatch, id])

  if (error || (!loading && !data)) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 p-4">
        <p className="text-red-400 text-xl">{error || 'Movie not found'}</p>
        <Link to="/" className="text-white underline">
          Back to home
        </Link>
      </div>
    )
  }

  const posterUrl =
    data?.poster_path &&
    `https://image.tmdb.org/t/p/w500${data.poster_path}`
  const backdropUrl =
    data?.backdrop_path &&
    `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`

  const handleToggleFavorite = () => {
    if (!data) return
    if (isFavorite) {
      dispatch(removeFavorite(data.id))
    } else {
      dispatch(
        addFavorite({
          id: data.id,
          title: data.title,
          poster_path: data.poster_path,
          overview: data.overview,
          release_date: data.release_date,
        })
      )
    }
  }

  return (
    <div className="relative min-h-screen bg-black flex text-white">
      {backdropUrl && (
        <div className="absolute inset-0 z-0">
          <img
            src={backdropUrl}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      <div className="relative z-10 w-[80%] mx-auto px-4 py-8 flex flex-col justify-center min-h-screen">
        <Link
          to="/"
          className="inline-block text-white hover:bg-white/10 mb-6 border w-fit mx-auto border-white/10 rounded-full px-4 py-2"
        >
          ← Back to home
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="shrink-0 w-full md:w-[40%]">
            {loading ? (
              <div className="w-full rounded-xl overflow-hidden bg-neutral-800 animate-pulse">
                <div className="w-full aspect-2/3 bg-neutral-700" />
              </div>
            ) : posterUrl ? (
              <img
                src={posterUrl}
                alt={data.title}
                className="w-full rounded-xl shadow-xl"
              />
            ) : (
              <div className="w-full aspect-2/3 bg-neutral-800 rounded-xl flex items-center justify-center text-neutral-500">
                No poster
              </div>
            )}
          </div>

          <div className="flex-1 gap-10 flex flex-col justify-center items-center">
            {loading ? (
              <>
                <div className="h-12 w-3/4 bg-neutral-800 rounded animate-pulse" />
                <div className="h-5 w-1/2 bg-neutral-800 rounded animate-pulse" />
                <div className="h-24 w-full max-w-[70%] bg-neutral-800 rounded animate-pulse" />
                <div className="h-12 w-40 bg-neutral-700 rounded animate-pulse" />
              </>
            ) : (
              <>
                <h1 className="text-3xl md:text-6xl font-bold mb-2 text-center">
                  {data.title}
                </h1>
                {data.release_date && (
                  <p className="text-white/80 mb-4">
                    Release date: {data.release_date}
                  </p>
                )}
                {data.overview && (
                  <p className="text-white/90 leading-relaxed mb-6 w-[70%]">
                    {data.overview}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  className="px-6 py-3 rounded-lg font-medium bg-white text-black hover:bg-gray-300 transition-colors"
                >
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
