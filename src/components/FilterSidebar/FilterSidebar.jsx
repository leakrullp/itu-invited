import "./FilterSidebar.css";
import { SelectField, TagsInputDropdown, Button } from "../index";
import clubs from "./Clubs.js";

export default function FilterSidebar({ filters, setFilters, onReset }) {
  return (
    <aside className="filters">
      <div className="sidebar-section">
        <div className="title-section">
          <h3>Filter</h3>
          <br />
          <Button size="small" variant="secondary" onClick={onReset}>
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
            checked={filters.ituChecked}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, ituChecked: e.target.checked }))
            }
          />
          <label>ITU-driven</label>

          <input
            type="checkbox"
            checked={filters.studentChecked}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                studentChecked: e.target.checked,
              }))
            }
          />
          <label>Student-driven</label>
        </div>

        <br />

        <SelectField
          label="Select club"
          options={clubs}
          value={filters.selectedClubs}
          onChange={(newValues) =>
            setFilters((prev) => ({ ...prev, selectedClubs: newValues }))
          }
        />
      </div>

      <div className="sidebar-section">
        <h4>By tag words</h4>
        <br />
        <TagsInputDropdown
          value={filters.selectedKeywords}
          onChange={(newValues) =>
            setFilters((prev) => ({ ...prev, selectedKeywords: newValues }))
          }
        />
      </div>

      <div className="sidebar-section">
        <div className="past-events">
          <input
            type="checkbox"
            checked={filters.pastEvents}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, pastEvents: e.target.checked }))
            }
          />
          <label>Include past events</label>
        </div>
      </div>
    </aside>
  );
}
