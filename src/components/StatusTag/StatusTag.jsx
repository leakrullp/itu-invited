import React from "react";
import "./StatusTag.css";

export default function TopicTag({ variant }) {
  const variants = {
    posted: { label: "Posted", icon: "check" },
    draft: { label: "Draft", icon: "draft" },
    archived: { label: "Archived", icon: "inventory_2" },
    error: { label: "Error", icon: "error" },
  };

  const data = variants[variant];

  if (!data) return null;

  return (
    <span className={`status-tag status-tag--${variant}`}>
      <span className="status-tag__label">{data.label}</span>
      <span className="material-symbols-outlined">{data.icon}</span>
    </span>
  );
}
