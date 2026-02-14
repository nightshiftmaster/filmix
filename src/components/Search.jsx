import React, { useState, useEffect, useRef } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SearchResultsList from "./SearchResultsList";
import { useDebounce } from "../utils/hooks";
import { handleSearchResultsNavigation } from "../utils/keyboard";

export default function Search() {
  const navigate = useNavigate();
  const searchCalls = useRef(0);
  const containerRef = useRef(null);

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
    }, 10_000);
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

    if (searchCalls.current >= 5) {
      setLoading(false);
      return;
    }

    searchCalls.current += 1;
    setLoading(true);

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query,
          )}&language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
            },
          },
        );

        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        const results = data.results ?? [];
        setMoviesList(results);
        setActiveIndex(results.length ? 0 : -1);
        setError(null);
      } catch {
        setError("Error fetching movies");
        setMoviesList([]);
        setActiveIndex(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedQuery]);

  useEffect(() => {
    setShowDropdown(
      searchQuery.trim().length > 1 && debouncedQuery.trim().length > 1,
    );
  }, [searchQuery, debouncedQuery]);

  useEffect(() => {
    if (!showDropdown) return;

    const close = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [showDropdown]);

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

  //   moviesList,
  //   setActiveIndex,
  //   showDropdown,
  //   closeDropdown,
  //   openActiveMovie,
  // ) => {
  //   if (!showDropdown) return;

  //   if (e.key === "ArrowDown") {
  //     e.preventDefault();
  //     setActiveIndex((i) => Math.min(i + 1, moviesList.length - 1));
  //   }

  //   if (e.key === "ArrowUp") {
  //     e.preventDefault();
  //     setActiveIndex((i) => Math.max(i - 1, 0));
  //   }

  //   if (e.key === "Enter") {
  //     if (activeIndex >= 0) {
  //       e.preventDefault();
  //       openActiveMovie();
  //     }
  //   }

  //   if (e.key === "Escape") {
  //     e.preventDefault();
  //     closeDropdown();
  //   }
  // };

  return (
    <>
      {showDropdown && (
        <div
          className="fixed inset-0 z-99"
          onClick={closeDropdown}
          aria-hidden
        />
      )}

      <div
        ref={containerRef}
        className="relative w-[90%] md:w-full md:max-w-lg mx-auto z-100"
      >
        <div className="relative w-full group">
          <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-white group-focus-within:text-gray-700" />
          <input
            type="text"
            placeholder="Search for a movie"
            className="w-full p-2 px-10 text-white text-lg rounded-full bg-gray-600 outline-none focus:bg-white focus:text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // onKeyDown={onInputKeyDown}
            onKeyDown={(e) =>
              handleSearchResultsNavigation(
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
    </>
  );
}
