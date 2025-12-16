import "./Input.css";

function InputField({
  type = "text",
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
          type={type}
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

export default InputField;
