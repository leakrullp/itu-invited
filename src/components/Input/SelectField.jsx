import { useState } from "react";
import "./Input.css";

export default function SelectField({
  label,
  placeholder = "None selected",
  options = [], //grouped options = [{"label", ["item", "item"]},{"label", ["item", "item"]}]
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

  //handles the case of options being ["term","term","term"] and not grouped
  const normalizedOptions =
    Array.isArray(options) &&
    options.length > 0 &&
    typeof options[0] === "string"
      ? [{ label: label ?? "Options", items: options }]
      : Array.isArray(options)
      ? options
      : [];

  // Display inside input after things are selected
  const displayValue =
    value.length === 0 ? placeholder : `${value.length} things selected`;

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
        <div className="input-el">{displayValue}</div>

        <span
          className="material-symbols-outlined icon right"
          aria-hidden="true"
        >
          {open ? "arrow_drop_up" : "arrow_drop_down"}
        </span>
      </div>

      {open && (
        <div className="dropdown-menu">
          {normalizedOptions.map((group, idx) => (
            <div key={group.label ?? idx} className="dropdown-group">
              {/* Group header */}
              {group.label && (
                <div className="dropdown-group-title">{group.label}</div>
              )}

              {/* Group items */}
              {(group.items ?? []).map((item) => (
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
