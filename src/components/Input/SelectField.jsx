import { useState } from "react";
import "./Input.css";

function SelectField({
  label, //what text to show above the dropdown
  placeholder = "None selected", //text to show before any selected
  options = [], //to hold tags from the database and show in dropdown
  value = [], //holds selected values
  onChange, //passes a function
  disabled = false, //makes sure dropdown only works when data is loaded
  invalid = false, //binary to test if dropdown works
  multiple = false, // enables multi selection
}) {
  const [open, setOpen] = useState(false);

  function toggleDropdown() {
    if (!disabled) setOpen(!open);
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
          {options.map((option) => (
            <label key={option} className="dropdown-item">
              <input
                type="checkbox"
                checked={value.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {invalid && <div className="helper error">Something’s not right.</div>}
    </div>
  );
}

export default SelectField;
