import { useState } from "react";
import TopicTag from "../TopicTag/TopicTag.jsx";
import "./Input.css";

function TextAreaField({
  label,
  placeholder = "",
  value,
  onChange,
  disabled = false,
  invalid = false,
}) {
  return (
    <div className={`input-field ${disabled ? "is-disabled" : ""}`}>
      {label && <label className="input-label">{label}</label>}

      <div
        className={`input-wrapper textarea-wrapper ${
          invalid ? "is-invalid" : ""
        }`}
      >
        <textarea
          className="input-el"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>

      {invalid && <div className="helper error">Check your input again</div>}
    </div>
  );
}

export default TextAreaField;
