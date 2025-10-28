import { Filter, Navbar, Entry } from "../components";
import data from "../assets/Data/Data";

export const Favorites = () => {
  // Map through data and create an Entry component for each data object
  const cards = data.map((card) => <Entry key={card.img} {...card} />);

  return (
    <>
      <main className="container">{cards}</main>

      <Filter />
    </>
  );
};
