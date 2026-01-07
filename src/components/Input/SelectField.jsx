import { useState } from "react";
import "./Input.css";

export default function SelectField({
  label,
  placeholder = "None selected",
  options = [], //grouped options = [{label, items},{label, items}]
  value = [],
  onChange,
  disabled = false,
  invalid = false,
}) {
  const [open, setOpen] = useState(false);

  function toggleDropdown() {
    if (!disabled) setOpen(!open); //setValue(!value) is a toggle pattern
  }

  function handleCheckboxChange(option) {
    let newValues;

    if (value.includes(option)) {
      newValues = value.filter((v) => v !== option);
    } else {
      newValues = [...value, option];
    }

    onChange(newValues);
  }

  // Display inside input
  const displayValue = value.length === 0 ? placeholder : value.join(", ");

  return (
    <div className={`input-field ${disabled ? "is-disabled" : ""}`}>
      {label && <label className="input-label">{label}</label>}

      <div
        className={[
          "input-wrapper",
          "has-right",
          invalid ? "is-invalid" : "",
        ].join(" ")}
        onClick={toggleDropdown}
        style={{ cursor: "pointer" }}
      >
        <div className="input-el fake-input">{displayValue}</div>

        <span
          className="material-symbols-outlined icon right"
          aria-hidden="true"
        >
          arrow_drop_down
        </span>
      </div>

      {open && (
        <div className="dropdown-menu">
          {options.map((group) => (
            <div key="group.label" className="dropdown-group">
              {/* Group header */}
              <div className="dropdown-group-title">{group.label}</div>

              {/* Group items */}
              {group.items.map((item) => (
                <label key={item} className="dropdown-item">
                  <input
                    type="checkbox"
                    checked={value.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  {item}
                </label>
              ))}
            </div>
          ))}
        </div>
      )}

      {invalid && <div className="helper error">Something’s not right.</div>}
    </div>
  );
}
