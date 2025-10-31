import "./App.css";
import { Filter, Entry } from "./components";
import data from "./assets/Data/Data";

export default function App() {
  const cards = data.map((card) => <Entry key={card.img} {...card} />);
  const totalEvents = data.length;

  return (
    <>
      <div className="event-count">
        <h2>Events ({totalEvents})</h2>
      </div>

      <main className="container">{cards}</main>

      <Filter />
    </>
  );
}
