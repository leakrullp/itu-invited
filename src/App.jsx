// Summary: The main application component. It imports data and renders the Navbar, a list of Entry cards, and a Filter section.
import "./App.css";
import { Filter, Navbar, Entry } from "./components";
import data from "./assets/Data/Data";

export default function App() {
  // Map through data and create an Entry component for each data object
  const cards = data.map((card) => <Entry key={card.img} {...card} />);
  const totalEvents = data.length; //Count how many events exist

  return (
    <>
      <Navbar />

      {/* Event counter */}
      <div className="event-count">
        <h2>Events ({totalEvents})</h2>
      </div>

      <main className="container">{cards}</main>

      <Filter />
    </>
  );
}
