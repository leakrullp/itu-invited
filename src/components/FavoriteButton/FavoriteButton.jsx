import "./FavoriteButton.css";

export default function FavoriteButton({ isFavorited, onClick }) {
  return (
    <button
      className={`favorite-button ${isFavorited ? "is-favorited" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <span className="material-symbols-outlined">bookmark</span>
    </button>
  );
}
