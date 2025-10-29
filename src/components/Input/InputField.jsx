import "./InputField.css";

/**
 * Props
 * - label?: string
 * - type?: "text" | "select" | "textarea" (default "text")
 * - placeholder?: string
 * - options?: string[] (for "select")
 * - value?: string
 * - onChange?: (e) => void
 * - hasLeftIcon?: boolean
 * - leftIcon?: string            // Material Symbols name
 * - hasRightIcon?: boolean
 * - rightIcon?: string           // Material Symbols name
 * - rightIconAriaLabel?: string  // if you later make it clickable
 * - disabled?: boolean
 * - invalid?: boolean            // for error styling
 */

export default function Input({
  label,
  type = "text",
  placeholder = "",
  options = [],
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
  const isTextArea = type === "textarea"; //evaluates to false if not textarea

  return (
    <div className={`input-field ${disabled ? "is-disabled" : ""}`}>
      {label && <label className="input-label">{label}</label>}
      <div
        className={[
          "input-wrapper",
          hasLeftIcon && !isTextArea ? "has-left" : "",
          hasRightIcon && !isTextArea ? "has-right" : "",
          invalid ? "is-invalid" : "",
        ].join(" ")}
      >
        {!isTextArea && hasLeftIcon && (
          <span className="material-symbols-outlined icon left" aria-hidden>
            {leftIcon}
          </span>
        )}

        {isTextArea ? (
          <textarea
            className="input-el"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        ) : type === "select" ? (
          <select
            className="input-el"
            value={value}
            onChange={onChange}
            disabled={disabled}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            className="input-el"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        )}

        {!isTextArea && hasRightIcon && (
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
