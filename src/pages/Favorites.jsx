import { FilterSidebar, EventCard } from "../components";
import dataFavorited from "../assets/Data/DataFavorited";
import "../index.css";
import "../App.css";

export const Favorites = () => {
  const cardsFavorited = dataFavorited
    .filter((card) => card.favorited)
    .map((card) => <EventCard key={card.img} {...card} />);

  return (
    <>
      <main className="container">{cardsFavorited}</main>

      <FilterSidebar />
    </>
  );
};
