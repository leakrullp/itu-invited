import { useState } from "react";
import TopicTag from "../TopicTag/TopicTag.jsx";
import "./Input.css";

function InputField({
  label,
  placeholder = "",
  value,
  onChange,
  hasLeftIcon = false,
  leftIcon,
  hasRightIcon = false,
  rightIcon,
  rightIconAriaLabel,
  disabled = false,
  invalid = false,
}) {
  return (
    <div className={`input-field ${disabled ? "is-disabled" : ""}`}>
      {label && <label className="input-label">{label}</label>}

      <div
        className={[
          "input-wrapper",
          hasLeftIcon ? "has-left" : "",
          hasRightIcon ? "has-right" : "",
          invalid ? "is-invalid" : "",
        ].join(" ")}
      >
        {hasLeftIcon && (
          <span className="material-symbols-outlined icon left" aria-hidden>
            {leftIcon}
          </span>
        )}

        <input
          type="text"
          className="input-el"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />

        {hasRightIcon && (
          <span
            className="material-symbols-outlined icon right"
            role="img"
            aria-label={rightIconAriaLabel || undefined}
          >
            {rightIcon}
          </span>
        )}
      </div>

      {invalid && <div className="helper error">Something’s not right.</div>}
    </div>
  );
}

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
          {/* Placeholder */}
          <option value="" disabled>
            {placeholder}
          </option>

          {/* Render both grouped and flat options */}
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

        {/* Custom right icon */}
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

function DateField({
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
          type="date"
          className="input-el"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />

        {/* <span className="material-symbols-outlined icon right" aria-hidden>
          calendar_month
        </span> */}
      </div>

      {invalid && <div className="helper error">Something’s not right.</div>}
    </div>
  );
}

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

        {/* <span className="material-symbols-outlined icon right" aria-hidden>
          nest_clock_farsight_analog
        </span> */}
      </div>

      {invalid && <div className="helper error">Something’s not right.</div>}
    </div>
  );
}

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

function TagInputField({
  label,
  placeholder = "Write something and press enter",
  value = [],
  onChange,
  disabled = false,
  invalid = false,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed !== "") {
        const updated = [...value, trimmed];
        onChange?.(updated);
        setInputValue("");
      }
    }
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      inputValue.trim() === "" &&
      value.length > 0
    ) {
      e.preventDefault();
      const updated = value.slice(0, -1);
      onChange?.(updated);
    }
  };

  const handleTagClick = (indexToRemove) => {
    const updated = value.filter((_, i) => i !== indexToRemove);
    onChange?.(updated);
  };

  return (
    <div className={`input-field ${disabled ? "is-disabled" : ""}`}>
      {label && <label className="input-label">{label}</label>}

      <div
        className={`input-wrapper tag-input-wrapper ${
          invalid ? "is-invalid" : ""
        }`}
        onClick={() => {
          const input = document.querySelector(".tag-input");
          input?.focus();
        }}
      >
        <div className="tag-list">
          {value.map((tag, i) => (
            <TopicTag
              variant="edit"
              key={i}
              text={tag}
              onClick={() => handleTagClick(i)}
            />
          ))}
        </div>

        <textarea
          className="input-el tag-input"
          placeholder={value.length ? "" : placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
      </div>

      {invalid && <div className="helper error">Check your input again</div>}
    </div>
  );
}

export {
  InputField,
  SelectField,
  DateField,
  TimeField,
  TextAreaField,
  TagInputField,
};
