import { useState } from "react";
import TopicTag from "../TopicTag/TopicTag.jsx";
import Button from "../../components/Button/Button.jsx";
import "./Input.css";

export default function TitleInput({ title, setTitle }) {
  return (
    <div className="title-container">
      <label className="title-field">
        <span>Title</span>
      </label>
      <input
        id="title"
        type="text"
        placeholder="Title of your event"
        className="title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}
