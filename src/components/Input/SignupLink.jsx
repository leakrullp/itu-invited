import { useState } from "react";
import TopicTag from "../TopicTag/TopicTag.jsx";
import Button from "../../components/Button/Button.jsx";
import "./Input.css";

export default function TitleInput() {
  return (
    <div className="SignupLink-container">
      <label className="SignupLink-field">
        <span>Signup link</span>
      </label>
      <br />
      <input
        id="title"
        type="text"
        placeholder="Add link to signup page"
        className="SignupLink-input"
      />
    </div>
  );
}
