import React, { useState, useEffect, useRef } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SearchResultsList from "./SearchResultsList";
import { useDebounce } from "../utils/hooks";
import { handleSearchKeysNavigation } from "../utils/keyboard";
import {
  fetchSearchMovies,
  RATE_LIMIT_MS,
  MAX_SEARCH_CALLS,
} from "../utils/fetchSearchMovies";

export default function Search() {
  const navigate = useNavigate();
  const searchCalls = useRef(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const id = setInterval(() => {
      searchCalls.current = 0;
    }, RATE_LIMIT_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const query = debouncedQuery.trim();

    if (!query) {
      setMoviesList([]);
      setActiveIndex(-1);
      setLoading(false);
      return;
    }

    if (searchCalls.current >= MAX_SEARCH_CALLS) {
      setLoading(false);
      return;
    }

    searchCalls.current += 1;
    setLoading(true);

    fetchSearchMovies(query)
      .then((results) => {
        setMoviesList(results);
        setActiveIndex(results.length ? 0 : -1);
        setError(null);
      })
      .catch(() => {
        setError("Error fetching movies");
        setMoviesList([]);
        setActiveIndex(-1);
      })
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  useEffect(() => {
    setShowDropdown(
      searchQuery.trim().length > 1 && debouncedQuery.trim().length > 1,
    );
  }, [searchQuery, debouncedQuery]);

  const closeDropdown = () => {
    setShowDropdown(false);
    setSearchQuery("");
    setMoviesList([]);
    setActiveIndex(-1);
  };

  const openActiveMovie = () => {
    const movie = moviesList[activeIndex];
    if (!movie) return;
    navigate(`/movie/${movie.id}`);
    closeDropdown();
  };

  return (
    <div className="relative w-[90%] md:w-full md:max-w-lg mx-auto z-100">
      <div className="relative w-full group">
        <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-white group-focus-within:text-gray-700" />
        <input
          type="text"
          placeholder="Search for a movie"
          className="w-full p-2 px-10 text-white text-lg rounded-full bg-gray-600 outline-none focus:bg-white focus:text-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) =>
            handleSearchKeysNavigation(
              e,
              moviesList,
              setActiveIndex,
              showDropdown,
              closeDropdown,
              openActiveMovie,
              activeIndex,
            )
          }
        />
      </div>

      {error ? (
        <p className="text-red-500 absolute mt-5 right-50 ">{error}</p>
      ) : (
        showDropdown && (
          <SearchResultsList
            loading={loading}
            moviesList={moviesList}
            activeIndex={activeIndex}
            onClose={closeDropdown}
          />
        )
      )}
    </div>
  );
}
