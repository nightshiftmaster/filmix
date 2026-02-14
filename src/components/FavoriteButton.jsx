import { useDispatch, useSelector } from "react-redux";
import { selectIsFavorite } from "../store/movies/selectors";
import { removeFavorite, addFavorite } from "../store/movies/actions";

export default function FavoriteButton({ movieId, movie }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => selectIsFavorite(state, movieId));

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
      type="button"
      onClick={handleToggle}
      className="px-6 py-3 rounded-lg font-medium bg-white text-black hover:bg-gray-300 transition-colors"
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}
