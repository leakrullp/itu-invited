import { useState } from "react";
import TopicTag from "../TopicTag/TopicTag.jsx";
import "./Input.css";

function TimeField({
  label,
  placeholder,
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
        <input
          type="time"
          className="input-el"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>

      {invalid && <div className="helper error">Something’s not right.</div>}
    </div>
  );
}

export default TimeField;
