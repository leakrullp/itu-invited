import { useState, useEffect } from "react";

export default function useFavoriteUIState() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("ui-favorites");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("ui-favorites", JSON.stringify(favorites));
  }, [favorites]);

  function setFavorite(eventId, value) {
    setFavorites((prev) => ({
      ...prev,
      [eventId]: value,
    }));
  }

  return { favorites, setFavorite };
}
