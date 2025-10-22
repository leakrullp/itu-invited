import React from "react";
import Filter from "./components/Filter/Filter";
import Navbar from "./components/Navbar/Navbar";
import Entry from "./components/Entry/Entry";
import data from "./assets/Data/Data.js";

export default function App() {
  const cards = data.map((card) => <Entry key={card.img} {...card} />);

  return (
    <>
      <Navbar />
      <main className="container">
      {cards}
      </main>
      <Filter />
    </>
  );
}
