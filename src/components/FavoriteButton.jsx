import { useDispatch, useSelector } from "react-redux";
import { selectIsFavorite } from "../store/movies/selectors";
import { removeFavorite, addFavorite } from "../store/movies/actions";
import { useRef, useEffect } from "react";

export default function FavoriteButton({ movieId, movie }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => selectIsFavorite(state, movieId));
  const favBtn = useRef(null);

  useEffect(() => {
    favBtn.current?.focus();
  }, []);

  const handleToggle = () => {
    if (!movieId) return;
    if (isFavorite) {
      dispatch(removeFavorite(movieId));
    } else if (movie) {
      dispatch(addFavorite({ ...movie }));
    }
  };

  return (
    <button
      ref={favBtn}
      type="button"
      data-section="add-favorites"
      onClick={handleToggle}
      className="px-6 py-3 rounded-lg font-medium bg-white text-black hover:bg-gray-300 transition-colors focus-within:outline-2 focus-within:outline-cyan-300 focus-within:animate-[tabsFocusPulse_1.2s_ease-in-out_infinite]"
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}
