// Summary: The main application component. It imports data and renders the Navbar, a list of Entry cards, and a Filter section.

import React from "react";
import Filter from "./components/Filter/Filter";
import Navbar from "./components/Navbar/Navbar";
import Entry from "./components/Entry/Entry";
import data from "./assets/Data/Data.js";

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
