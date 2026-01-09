import { useEffect, useState } from "react";
import { getUserFavorites } from "../pages/Favorites/favoriteService";

export default function useFavoriteUIState() {
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    async function loadFavorites() {
      try {
        const favs = await getUserFavorites();
        const favMap = {};
        favs.forEach((item) => {
          //if i have favorites an event it is saved as an object: {"TLiGUdoBPK" : true}
          favMap[item.get("eventID").id] = true;
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
