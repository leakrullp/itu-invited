import { useState } from "react";
import "./FavoriteButton.css";

export default function FavoriteButton({ initial = false, onChange }) {
  const [isFavorited, setIsFavorited] = useState(initial);

  function toggleFavorite() {
    const newValue = !isFavorited;
    setIsFavorited(newValue);
    onChange?.(newValue);
  }
  return (
    <button
      className={`favorite-button ${isFavorited ? "is-favorited" : ""}`}
      onClick={toggleFavorite}
    >
      <span className="material-symbols-outlined">bookmark</span>
    </button>
  );
}
