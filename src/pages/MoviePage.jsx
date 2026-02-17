import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../store/movies/actions";
import { selectDetailsData } from "../store/movies/selectors";
import Skeleton from "../components/Skeleton";
import FavoriteButton from "../components/FavoriteButton";
import BackHomeButton from "../components/BackHomeButton";
import { useMoviePageKeyboard } from "../hooks/usePageKeyboard";
import { motion } from "motion/react";
import { fadeIn } from "../motion/variants";

export default function MoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(selectDetailsData);

  useEffect(() => {
    if (id) dispatch(fetchMovieDetails(Number(id)));
  }, [dispatch, id]);

  useMoviePageKeyboard(navigate);

  if (error || (!loading && !data)) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 p-4">
        <p className="text-red-400 text-xl">{error || "Movie not found"}</p>
        <BackHomeButton />
      </div>
    );
  }

  const posterUrl =
    data?.poster_path && `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  const backdropUrl =
    data?.backdrop_path &&
    `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`;

  return (
    <div className="relative min-h-screen bg-black flex text-white pt-24 md:pt-0">
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
      <div className="relative z-10 w-[80%] mx-auto px-4 py-8 flex flex-col justify-center min-h-[calc(100vh-6rem)] md:min-h-screen">
        <div className="flex flex-col md:flex-row gap-8">
          {loading ? (
            <div className="shrink-0 w-full md:w-[40%]">
              <Skeleton variant="poster" />
            </div>
          ) : (
            <motion.div
              className="shrink-0 w-full md:w-[40%]"
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              animate="show"
            >
              {posterUrl ? (
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
            </motion.div>
          )}

          {loading ? (
            <div className="flex-1 gap-10 flex flex-col justify-center items-center">
              <Skeleton variant="detail" />
            </div>
          ) : (
            <motion.div
              className="flex-1 gap-10 flex flex-col justify-center items-center"
              variants={fadeIn("left", 0.2)}
              initial="hidden"
              animate="show"
            >
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
              <FavoriteButton movieId={data.id} movie={data} />
              <BackHomeButton />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
