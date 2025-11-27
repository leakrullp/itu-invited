import { useState } from "react";
import Button from "../../components/Button/Button.jsx";
import ThumbnailInput from "../../components/Input/ThumbnailInput.jsx";
import TitleInput from "../../components/Input/TitleInput.jsx";
import DatetimeInput from "../../components/Input/DatetimeInput.jsx";
import DescriptionInputField from "../../components/Input/DescriptionInputField.jsx";
import TagsInputDropdown from "../../components/Input/TagsInputDropdown.jsx";
import SignupLink from "../../components/Input/SignupLink.jsx";
import "./CreateEvent.css";
import { SaveEventToDB } from "./SaveEventToDB";

export const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //const [thumbnailPicture, setThumbnailPicture] = useState(null);
  const [selectedPicture, setSelectedPicture] = useState(null);

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
        selectedPicture,
      });

      console.log("Event saved with ID:", savedObj.id);
      showPopup("Event posted for all to see!");
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  return (
    <main className="createevent-container">
      <h2 className="createevent-title">Create an event for ITUnderground</h2>
      {/*<ThumbnailInput onThumbnailSaved={setThumbnailPicture} />*/}
      <ThumbnailInput onSelect={(pic) => setSelectedPicture(pic)} />
      {/*<ThumbnailInput />*/}
      <TitleInput title={title} setTitle={setTitle} />
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
      <DescriptionInputField
        description={description}
        setDescription={setDescription}
      />
      <TagsInputDropdown />
      <SignupLink />
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
