import { useState } from "react";
import Parse from "parse"; // Import Parse SDK
import Button from "../components/Button/Button.jsx";
import "./Createevent.css";

export const Createevent = () => {
  // --- State for form fields ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  // --- Helper: show popup feedback ---
  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 5000);
  };

  // --- Handle posting to Back4App ---
  const handlePostNow = async () => {
    try {
      const Event = Parse.Object.extend("Event");
      const event = new Event();

      // Convert date + times into Date objects
      const startDateTime = new Date(`${date}T${startTime}`);
      const endDateTime = new Date(`${date}T${endTime}`);

      // --- Set the fields according to your schema ---
      event.set("eventID", crypto.randomUUID()); // generate unique ID for now
      event.set("orgID", "testOrgID123"); // set your actual org ID if available
      event.set("startTime", startDateTime);
      event.set("endTime", endDateTime);
      event.set("eventCatID", "defaultCatID"); // you can change later
      event.set("isPosted", true);
      event.set("eventPicID", "placeholderPicID");

      // Optionally store extra UI fields (if you add columns in DB)
      event.set("title", title);
      event.set("description", description);

      // --- Save to Back4App ---
      const savedEvent = await event.save();

      console.log("✅ Event saved:", savedEvent);
      showPopup("Event posted successfully!");
    } catch (error) {
      console.error("❌ Error saving event:", error);
      showPopup("Error: " + error.message);
    }
  };

  const handleSaveDraft = () => {
    showPopup("Saved as draft. Go to 'My events'");
  };

  return (
    <main className="createevent-container">
      <h2 className="createevent-title">Create an event for ITUnderground</h2>

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

      <div className="date-container">
        <label className="date-field">
          <span>Date & Time</span>
        </label>

        <div className="datetime-inputs">
          <input
            id="date"
            type="date"
            className="date-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="time-range">
            <input
              id="start-time"
              type="time"
              className="date-input"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <span className="time-separator">–</span>
            <input
              id="end-time"
              type="time"
              className="date-input"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
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
  );
};
