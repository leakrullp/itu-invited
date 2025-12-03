import { useEffect, useState } from "react";
import { getUserFavorites } from "../pages/Favorites/favoriteService";

export default function useFavoriteUIState() {
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    async function loadFavorites() {
      try {
        const favs = await getUserFavorites(); // fetch from Parse
        const favMap = {};
        favs.forEach((f) => {
          favMap[f.get("eventID").id] = true;
        });
        setFavorites(favMap);
        localStorage.setItem("ui-favorites", JSON.stringify(favMap));
      } catch (err) {
        console.error("Failed to load favorites:", err);
      }
    }

    loadFavorites();
  }, []);

  // Whenever favorites change, sync localStorage
  useEffect(() => {
    localStorage.setItem("ui-favorites", JSON.stringify(favorites));
  }, [favorites]);

  function setFavorite(eventId, value) {
    setFavorites((prev) => ({ ...prev, [eventId]: value }));
  }

  return { favorites, setFavorite };
}
