import { useState } from "react";
import TopicTag from "../TopicTag/TopicTag.jsx";
import Button from "../../components/Button/Button.jsx";
import "./Input.css";

export default function TitleInput() {
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
      />
    </div>
  );
}
