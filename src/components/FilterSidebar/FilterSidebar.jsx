import "./FilterSidebar.css";
import { useState } from "react";
import {
  SelectField,
  TagInputField,
  TagsInputDropdown,
  Button,
} from "../index";
import clubs from "./Clubs.js";

export default function FilterSidebar({ pastEvents, onTogglePastEvents }) {
  const [selectedClubs, setSelectedClubs] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [ituChecked, setItuChecked] = useState(true);
  const [studentChecked, setStudentChecked] = useState(true);

  const resetFilters = () => {
    setSelectedClubs([]);
    setSelectedKeywords([]);
    setItuChecked(true);
    setStudentChecked(true);
  };

  return (
    <aside className="filters">
      <div className="sidebar-section">
        <div className="title-section">
          <h3>Filter</h3>
          <br />
          <Button size="small" variant="secondary" onClick={resetFilters}>
            Reset all
          </Button>
        </div>
      </div>

      <div className="sidebar-section">
        <h4>By organizers</h4>
        <br />
        <div className="title-section">
          <input
            type="checkbox"
            name="itu-checkbox"
            checked={ituChecked}
            onChange={(e) => setItuChecked(e.target.checked)}
          />
          <label>ITU-driven</label>
          <input
            type="checkbox"
            name="student-checkbox"
            checked={studentChecked}
            onChange={(e) => setStudentChecked(e.target.checked)}
          />
          <label>Student-driven</label>
        </div>
        <br />
        <SelectField
          label="Select club"
          options={clubs}
          value={selectedClubs}
          onChange={setSelectedClubs}
        />
      </div>

      <div className="sidebar-section">
        <h4>By tag words</h4>
        <br />
        <TagsInputDropdown
          value={selectedKeywords}
          onChange={setSelectedKeywords}
        />
      </div>
      <div className="sidebar-section">
        <div className="past-events">
          <input
            type="checkbox"
            name="myCheckbox"
            checked={pastEvents}
            onChange={onTogglePastEvents}
          />

          <label>Include past events</label>
        </div>
      </div>
    </aside>
  );
}
