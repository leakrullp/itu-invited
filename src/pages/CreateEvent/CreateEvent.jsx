import { useState } from "react";
import Button from "../../components/Button/Button.jsx";
import ThumbnailInput from "../../components/Input/ThumbnailInput.jsx";
import TitleInput from "../../components/Input/TitleInput.jsx";
import DatetimeInput from "../../components/Input/DatetimeInput.jsx";
import DescriptionInputField from "../../components/Input/DescriptionInputField.jsx";
import TagsInputDropdown from "../../components/Input/TagsInputDropdown.jsx";
import SignupLink from "../../components/Input/SignupLink.jsx";

import "./CreateEvent.css";
import Parse from "parse"; // use our configured Parse instance
import initializeAllParse from "../../parseConfig.js";

export const CreateEvent = () => {
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
        {/*Todo: change text to "Create an event for {logged in Organization}"*/}
        <h2 className="createevent-title">Create an event for ITUnderground</h2>
        <ThumbnailInput />
        <TitleInput />
        <DatetimeInput />
        <DescriptionInputField />
        <TagsInputDropdown />
        <SignupLink />
        {/*Todo: create signupLink tekst felt string*/}
        {/*Buttons to determine what to do with input values*/}
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
        {popupMessage && <div className="draft-popup">{popupMessage}</div>}{" "}
        {/*only render popupMessage if it is not null*/}
      </main>
    </>
  );
};

export default CreateEvent;
