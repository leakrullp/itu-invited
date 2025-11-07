import "./App.css";
import { FilterSidebar, EventCard } from "./components";
import data from "./assets/Data/Data";

export default function App() {
  const cards = data.map((card) => <EventCard key={card.img} {...card} />);
  const totalEvents = data.length;

  return (
    <>
      <div className="event-count">
        <h2>Events ({totalEvents})</h2>
      </div>

      <main className="container">{cards}</main>

      <FilterSidebar />
    </>
  );
}
