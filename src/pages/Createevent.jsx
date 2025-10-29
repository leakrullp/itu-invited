import { useState } from "react";
import Button from "../components/Button/Button.jsx";
import "./Createevent.css";

export const Createevent = () => {
  const [popupMessage, setPopupMessage] = useState("");

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 5000);
  };

  const handleSaveDraft = () => {
    showPopup("Saved as draft. Go to 'My events'");
  };

  const handlePostNow = () => {
    showPopup("Event posted!");
  };

  return (
    <>
      <main className="createevent-container">
        <h2 className="createevent-title">Create an event for ITUnderground</h2>

        <div className="thumbnail-upload">
          <Button variant="tertiary" size="large" icon="image">
            Upload thumbnail
          </Button>
        </div>

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

        <div className="date-container">
          <label className="date-field">
            <span>Date & Time</span>
          </label>

          <div className="datetime-inputs">
            <input id="date" type="date" className="date-input" />

            <div className="time-range">
              <input id="start-time" type="time" className="date-input" />
              <span className="time-separator">–</span>
              <input id="end-time" type="time" className="date-input" />
            </div>
          </div>
        </div>

        <div className="description-container">
          <label className="description-field">
            <span>Description</span>
          </label>
          <textarea
            id="description"
            placeholder="Add your event description..."
            className="description-input"
            rows="4"
          ></textarea>
        </div>

        <div className="attachfiles-container">
          <Button variant="secondary" size="small" icon="attach_file">
            Attach files
          </Button>
          <p className="file-count">0 files attached so far</p>
        </div>

        <div className="button-group">
          <Button variant="tertiary" size="large">
            Cancel
          </Button>
          <Button
            variant="secondary"
            size="large"
            icon="draft"
            onClick={handleSaveDraft}
          >
            Save draft
          </Button>
          <Button variant="secondary" size="large" icon="calendar_month">
            Schedule post
          </Button>
          <Button
            variant="primary"
            size="large"
            icon="send"
            onClick={handlePostNow}
          >
            Post now
          </Button>
        </div>

        {popupMessage && <div className="draft-popup">{popupMessage}</div>}
      </main>
    </>
  );
};
