// Summary: The main application component. It imports data and renders the Navbar, a list of Entry cards, and a Filter section.
import { useState } from "react";
import "./App.css";
import {
  Button,
  StatusTag,
  TopicTag,
  Filter,
  Navbar,
  Entry,
} from "./components";
import data from "./assets/Data/Data";

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
