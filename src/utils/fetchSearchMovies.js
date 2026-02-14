export const RATE_LIMIT_MS = 10_000;
export const MAX_SEARCH_CALLS = 5;

export async function fetchSearchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
    },
  });
  if (!response.ok) throw new Error(response.statusText);
  const data = await response.json();
  return data.results ?? [];
}
