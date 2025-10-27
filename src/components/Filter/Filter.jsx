// Summary: Placeholder component for future event filtering functionality.

// Summary: Dropdown filter for student organizations.

import React from "react";
import "./Filter.css";

export default function Filter({ onFilterChange }) {
  return (
    <div className="FilterBox">
      <h3>Filter by Student Organization</h3>
      <select onChange={onFilterChange}>
        <option value="None selected">None selected</option>
        <option value="Analog">Analog</option>
        <option value="Campus Cup">Campus Cup</option>
        <option value="DAK">DAK</option>
        <option value="DIM Union">DIM Union</option>
        <option value="InclusivIT">InclusivIT</option>
        <option value="PhD Club">PhD Club</option>
        <option value="Que(e)ries">Que(e)ries</option>
        <option value="ScrollBar">ScrollBar</option>
        <option value="Student Council">Student Council</option>
        <option value="SustainIT">SustainIT</option>
        <option value="Vera">Vera</option>
        <option value="ClimbIT">ClimbIT</option>
        <option value="FloatIT">FloatIT</option>
        <option value="ITU Active">ITU Active</option>
        <option value="ITU Basketball">ITU Basketball</option>
        <option value="ITU Dance">ITU Dance</option>
        <option value="ITU FC">ITU FC</option>
        <option value="ITU Padel">ITU Padel</option>
        <option value="RunIT">RunIT</option>
        <option value="TrekIT">TrekIT</option>
        <option value="Capture IT">Capture IT</option>
        <option value="CommIT Con">CommIT Con</option>
        <option value="Connect">Connect</option>
        <option value="ITU Rooks">ITU Rooks</option>
        <option value="ITUnited">ITUnited</option>
        <option value="KnitIT">KnitIT</option>
        <option value="Node">Node</option>
        <option value="WineIT">WineIT</option>
        <option value="ITU LAN">ITU LAN</option>
        <option value="gameDevCorner">gameDevCorner</option>
        <option value="lowscore">lowscore</option>
        <option value="AITU">AITU</option>
        <option value="ITUnderground">ITUnderground</option>
        <option value="Lille Kat">Lille Kat</option>
        <option value="Pokerbot Battle">Pokerbot Battle</option>
        <option value="Python Study Group">Python Study Group</option>
        <option value="RoyalHacks">RoyalHacks</option>
        <option value="localhost">localhost</option>
      </select>

      <h2 className="Keywords">Keywords</h2>
      <h3 className="Input">Input</h3>
      <h3 className="Add">Add from most popular</h3>
    </div>
  );
}
