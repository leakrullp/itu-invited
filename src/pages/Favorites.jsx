import { Filter, Navbar, Entry } from "../components";
import data from "../assets/Data/Data";

export const Favorites = () => {
  // Map through data and create an Entry component for each data object
  const cardsFavorited = data.map((card) => <Entry key={card.img} {...card} />);

  return (
    <>
      <main className="container">{cardsFavorited}</main>

      <Filter />
    </>
  );
};
