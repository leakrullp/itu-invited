import { Filter, Navbar, Entry } from "../components";
import dataFavorited from "../assets/Data/DataFavorited";
import "../index.css";
import "../App.css";

export const Favorites = () => {
  // Map through DataFavorited and create an Entry component for each data object
  const cardsFavorited = dataFavorited
    .filter((card) => card.favorited) //filter on cards that are
    .map((card) => <Entry key={card.img} {...card} />);

  return (
    <>
      <main className="container">{cardsFavorited}</main>

      <Filter />
    </>
  );
};
