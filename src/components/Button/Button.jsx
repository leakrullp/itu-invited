import "./Button.css";

export default function Button({
  variant = "primary",
  size = "large",
  icon,
  children,
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
