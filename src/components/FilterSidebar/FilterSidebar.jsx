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
  const [selectedClub, setSelectedClub] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [ituChecked, setItuChecked] = useState(true);
  const [studentChecked, setStudentChecked] = useState(true);

  return (
    <aside className="filters">
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
          value={selectedClub}
          onChange={(e) => setSelectedClub(e.target.value)}
        />
      </div>

      <div className="sidebar-section">
        <h4>Keywords</h4>
        <br />
        <TagsInputDropdown />
        {/* <TagInputField
          label="Enter topics"
          value={keywords}
          onChange={setKeywords}
        /> */}
        {/* <br /> */}
        {/* <h4>Add from most popular</h4> */}
        {/* <div className="button-group">
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
        </div> */}
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
