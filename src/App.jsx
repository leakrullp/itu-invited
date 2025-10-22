import React from "react";
import Filter from "./components/Filter/Filter";
import Navbar from "./components/Navbar/Navbar";



export default function App() {
  return (
    <>
      <Navbar />
      <main className="container"></main>
      <Filter />
    </>
  );
}
