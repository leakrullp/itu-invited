// Summary: The main application component. It imports data and renders the Navbar, a list of Entry cards, and a Filter section.

import React from "react";
import Filter from "./components/Filter/Filter";
import Navbar from "./components/Navbar/Navbar";
import Entry from "./components/Entry/Entry";
import data from "./assets/Data/Data.js";

export default function App() {
  // Map through data and create an Entry component for each data object
  const cards = data.map((card) => <Entry key={card.img} {...card} />);

  return (
    <>
      {/* Navbar at the top of the page */}
      <Navbar />

      {/* Main container displaying all event cards */}
      <main className="container">{cards}</main>

      {/* Filter component at the bottom */}
      <Filter />
    </>
  );
}
