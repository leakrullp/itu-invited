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

  //for uploading thumbnail photos
  const [thumbnailPicture, setThumbnailPicture] = useState(null);

  // when users clicks Post Now button
  const handlePostNow = async () => {
    showPopup("Event posted!");

    // Initialize Parse (if needed)
    initializeAllParse();

    // Create a new Event table row
    const Event = Parse.Object.extend("Event");
    const newEvent = new Event();

    // Values sent if nothing from input is given
    //  ------DO NOT DELETE FOR TESTING PURPOSES -----
    newEvent.set("isPosted", true);
    newEvent.set("startTime", new Date("2025-12-22T19:30"));
    newEvent.set("endTime", new Date("2025-12-22T19:30"));
    newEvent.set("title", "sent_from_frontEnd");
    newEvent.set("description", "descriptionaroisblob");
    const orgID = "5z1KbHqPBC"; //is present in DB
    const Organization = Parse.Object.extend("Organization");
    const orgObj = new Organization();
    orgObj.id = orgID;
    newEvent.set("orgID", orgObj);
    const selectedTags = ["Fun", "Python"]; //are present in DB
    const EventTag = Parse.Object.extend("EventTag");
    const tagQuery = new Parse.Query(EventTag);
    tagQuery.containedIn("term", selectedTags); //points to tag based on value in "term" column
    const tagObjects = await tagQuery.find();
    const relation = newEvent.relation("eventTag");
    tagObjects.forEach((tagObj) => {
      relation.add(tagObj);
    }); //add relation for each tag in the list given to the db
    newEvent.set("signupLink", "https://erdetfredag.dk/");
    const Picture = Parse.Object.extend("Picture");
    const picObj = new Picture();
    picObj.id = "sQrZAOqBFz"; // is present in DB
    newEvent.set("eventPicID", picObj);

    // Save to database
    newEvent.save().then(
      (savedObj) => {
        console.log("Event saved with ID:", savedObj.id); //delete when done testing
      },
      (error) => {
        console.error("Error saving event:", error); //todo: make a popup
      }
    );
  };

  return (
    <>
      <main className="createevent-container">
        {/*Todo: change text to "Create an event for {logged in Organization}"*/}
        <h2 className="createevent-title">Create an event for ITUnderground</h2>
        <ThumbnailInput onThumbnailSaved={setThumbnailPicture} />

        <TitleInput />
        <DatetimeInput />
        <DescriptionInputField />
        <TagsInputDropdown />
        <SignupLink />

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

        {popupMessage && <div className="draft-popup">{popupMessage}</div>}
        {/*only render popupMessage if it is not null*/}
      </main>
    </>
  );
};

export default CreateEvent;
