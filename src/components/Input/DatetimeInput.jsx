import { useState } from "react";
import TopicTag from "../TopicTag/TopicTag.jsx";
import Button from "../../components/Button/Button.jsx";
import "./Input.css";

export default function DatetimeInput() {
  return (
    <div className="date-container">
      {/*Todo: Add a date-field for end-time/*/}
      <label className="date-field">
        <span>Date & Time</span>
      </label>

      <div className="datetime-inputs">
        <div className="start-timestamp">
          <span className="timestamp-label">Starts</span>
          <br />
          <input id="date" type="date" className="date-input" />
          <input id="start-time" type="time" className="date-input" />
        </div>

        <div className="end-timestamp">
          <span className="timestamp-label">Ends</span>
          <br />
          <input id="end-date" type="date" className="date-input" />
          <input id="end-time" type="time" className="date-input" />
        </div>
      </div>
    </div>
  );
}
