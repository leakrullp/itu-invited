import { useState } from "react";
import { TopicTag } from "../../index";
import "../Input.css";

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

export default TagInputField;
