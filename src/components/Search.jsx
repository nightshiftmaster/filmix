import React, { useState, useEffect, useRef } from "react";
import { IoSearchSharp } from "react-icons/io5";
import SearchResultsList from "./SearchResultsList";
import { useDebounce } from "../utils/hooks";

export default function Search() {
  const searchCalls = useRef(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
            },
          },
        );

        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        setMoviesList(data.results ?? []);
      } catch {
        setError("Error fetching movies");
        setMoviesList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedQuery]);

  const showDropdown =
    searchQuery.trim().length > 1 && debouncedQuery.trim().length > 1;

  return (
    <>
      {showDropdown && (
        <div
          className="fixed inset-0 z-99"
          onClick={() => setSearchQuery("")}
          aria-hidden
        />
      )}

      <div className="absolute bottom-30 left-0 right-0 w-[90%] md:w-full md:max-w-lg mx-auto z-100">
        <div className="relative w-full group">
          <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white group-focus-within:text-gray-700" />
          <input
            type="text"
            placeholder="Search for a movie"
            className="w-full p-2 px-10 text-white text-lg rounded-full bg-gray-600 outline-none focus:bg-white focus:text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          showDropdown && (
            <SearchResultsList loading={loading} moviesList={moviesList} />
          )
        )}
      </div>
    </>
  );
}
