//Just an idea to manage favorite items in our React application - not testeted
import { useState } from "react";

export default function useFavorites() {
  const [myFavoriteThings, setMyFavoriteThings] = useState([]);

  function addFavorite(id) {
    setMyFavoriteThings(prev =>
      prev.includes(id) ? prev : [...prev, id]
    );
  }

  function removeFavorite(id) {
    setMyFavoriteThings(prev => prev.filter(item => item !== id));
  }

  return {
    favorites: myFavoriteThings,
    addFavorite,
    removeFavorite,
  };
}