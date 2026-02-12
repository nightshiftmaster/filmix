import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoHeartOutline } from "react-icons/io5";
import { fetchMovies } from "../store/movies/actions";
import { selectListState } from "../store/movies/selectors";
import { handleMoviesKeyboardNavigation } from "../utils/keyboard";
import MovieCard from "./MovieCard";
import Skeleton from "./Skeleton";
import Pagination from "./Pagination";

export default function MovieGrid({
  category = "Popular",
  filterId = "popular",
}) {
  const dispatch = useDispatch();
  const { movies, loading, error, totalPages } = useSelector((state) =>
    selectListState(state, filterId),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const isFavorites = filterId === "favorites";

  useEffect(() => {
    if (!isFavorites) {
      dispatch(fetchMovies(currentPage, filterId));
    }
  }, [dispatch, currentPage, filterId, isFavorites]);

  if (error) return <p className="text-red-400 p-4">Error: {error}</p>;

  const skeletonCount = 15;

  return (
    <div className="w-full flex flex-col gap-10 md:px-20 px-4 mb-30">
      <div className="p-10 ">
        <h2 className="md:text-4xl  text-2xl md:text-left text-center font-bold text-white mb-4">
          {category}
        </h2>
        <div
          className="flex md:flex-wrap gap-1 overflow-x-auto md:overflow-x-hidden overflow-y-auto max-h-[70vh] md:overflow-y-visible md:max-h-none pb-2 pt-5 pl-4 pr-2 min-h-0"
          onKeyDown={handleMoviesKeyboardNavigation}
        >
          {loading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 w-[calc((100%-3*0.25rem)/4)] p-1 -m-1"
                >
                  <Skeleton />
                </div>
              ))
            : movies?.length > 0
              ? movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="shrink-0 md:w-[calc((100%-3*0.25rem)/4)] w-[calc((100%-3*0.25rem)/1.6)]  "
                  >
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
        {!loading && !isFavorites && (
          <Pagination setCurrentPage={setCurrentPage} pagesCount={totalPages} />
        )}
      </div>
    </div>
  );
}
