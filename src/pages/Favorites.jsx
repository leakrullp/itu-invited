import { Filter, Navbar, Entry } from "../components";
import dataFavorited from "../assets/Data/DataFavorited";

export const Favorites = () => {
  // Map through data and create an Entry component for each data object
  const cardsFavorited = dataFavorited.map((card) => (
    <Entry key={card.img} {...card} />
  ));

  return (
    <>
      <main className="container">{cardsFavorited}</main>

      <Filter />
    </>
  );
};
