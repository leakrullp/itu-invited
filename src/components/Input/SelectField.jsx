import { useState } from "react";
import TopicTag from "../TopicTag/TopicTag.jsx";
import "./Input.css";

function SelectField({
  label,
  placeholder = "Select option",
  options = [],
  value,
  onChange,
  disabled = false,
  invalid = false,
}) {
  return (
    <div className={`input-field ${disabled ? "is-disabled" : ""}`}>
      {label && <label className="input-label">{label}</label>}

      <div
        className={[
          "input-wrapper",
          "has-right",
          invalid ? "is-invalid" : "",
        ].join(" ")}
      >
        <select
          className="input-el"
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) =>
            typeof option === "string" ? (
              <option key={option} value={option}>
                {option}
              </option>
            ) : (
              <optgroup key={option.label} label={option.label}>
                {option.items.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </optgroup>
            )
          )}
        </select>

        <span
          className="material-symbols-outlined icon right"
          aria-hidden="true"
        >
          arrow_drop_down
        </span>
      </div>

      {invalid && <div className="helper error">Something’s not right.</div>}
    </div>
  );
}

export default SelectField;
