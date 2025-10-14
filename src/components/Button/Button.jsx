import "./Button.css";

export default function Button({
  variant = "primary", // "primary" | "secondary" | "tertiary"
  size = "large", // "small" | "large"
  icon, // string for Material Symbol name (optional)
  children, // button text
  ...props
}) {
  const classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    icon ? "btn--icon" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {icon && <span className="material-symbols-outlined">{icon}</span>}
      <span className="btn__label">{children}</span>
    </button>
  );
}
