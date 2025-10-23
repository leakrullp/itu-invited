import "./TopicTag.css";

export default function TopicTag({ text, variant = "read", onClick }) {
  const isEditable = variant === "edit";

  return (
    <button
      className={`topic-tag topic-tag--${variant}`}
      type="button"
      onClick={isEditable ? onClick : undefined}
      disabled={!isEditable}
    >
      <span className="topic-tag__label">{text}</span>
      {isEditable && (
        <span className="material-symbols-outlined topic-tag__icon">close</span>
      )}
    </button>
  );
}
