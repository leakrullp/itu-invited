// Summary: Placeholder component for future event filtering functionality.

// Summary: Dropdown filter for student organizations.

import { useState } from "react";
import Button from "../Button/Button";
import {
  InputField,
  SelectField,
  DateField,
  TimeField,
  TextAreaField,
  TagInputField,
} from "../Input/Input";
import "./Filter.css";
import clubs from "../../assets/Data/Clubs.js";

export default function Filter({ onFilterChange }) {
  const [selectedClub, setSelectedClub] = useState("");
  const [keywords, setKeywords] = useState([]);

  return (
    <aside className="FilterBox">
      <div className="sidebar-section">
        <div className="title-section">
          <h3>Filters</h3>
          <br />
          <Button size="small" variant="secondary">
            Reset filters
          </Button>
        </div>
      </div>

      <div className="sidebar-section">
        <h4>Organizers</h4>
        <br />
        <SelectField
          label="Select club"
          placeholder="None selected"
          options={clubs}
          value={selectedClub}
          onChange={(e) => setSelectedClub(e.target.value)}
        />
      </div>

      <div className="sidebar-section">
        <h4>Keywords</h4>
        <br />
        <TagInputField
          label="Enter topics"
          value={keywords}
          onChange={setKeywords}
        />
        <br />
        <h4>Add from most popular</h4>
        <div className="button-group">
          <Button size="small" icon="add" variant="secondary">
            Free (170)
          </Button>
          <Button size="small" icon="add" variant="secondary">
            ITU (97)
          </Button>
          <Button size="small" icon="add" variant="secondary">
            Research project (45)
          </Button>
          <Button size="small" icon="add" variant="secondary">
            Career (150)
          </Button>
          <Button size="small" icon="add" variant="secondary">
            Awesome (168)
          </Button>
          <Button size="small" icon="add" variant="secondary">
            Social (70)
          </Button>
          <Button size="small" icon="add" variant="secondary">
            Sports (68)
          </Button>
          <Button size="small" icon="add" variant="secondary">
            Career (43)
          </Button>
        </div>
      </div>
    </aside>
  );
}
