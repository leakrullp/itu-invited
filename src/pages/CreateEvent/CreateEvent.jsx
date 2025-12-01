import { useState } from "react";
import {
  Button,
  DatetimeInput,
  InputField,
  TagsInputDropdown,
  TextAreaField,
  ThumbnailInput,
} from "../../components";
import "./CreateEvent.css";
import { SaveEventToDB } from "./SaveEventToDB";

export const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailPicture, setThumbnailPicture] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [popupMessage, setPopupMessage] = useState("");

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 5000);
  };

  const handleSaveDraft = () => {
    showPopup("Saved as draft. Go to 'My events'");
  };

  const handlePostNow = async () => {
    try {
      const savedObj = await SaveEventToDB({
        title,
        description,
        startTime,
        endTime,
        startDate,
        endDate,
        thumbnailPicture,
      });

      console.log("Event saved with ID:", savedObj.id);
      showPopup("Event posted!");
    } catch (error) {
      console.error("Error saving event:", error);
      showPopup("An error occurred while posting.");
    }
  };

  return (
    <main className="createevent-container">
      <h2 className="createevent-title">Create an event for ITUnderground</h2>

      <ThumbnailInput onThumbnailSaved={setThumbnailPicture} />

      <InputField
        label="Title"
        placeholder="Title of your event"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <DatetimeInput
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <TextAreaField
        label="Description"
        placeholder="Add your event description"
        rows="4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <TagsInputDropdown />

      <InputField label="Signup link" />

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
  );
};

export default CreateEvent;
