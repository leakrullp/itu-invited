import { useState, useEffect } from "react";
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
import {
  returnOrgNameForAdminUser,
  returnOrgIdForAdminUser,
} from "./LoadOrganizationData";

export const CreateEvent = ({ currentUser }) => {
  const [orgId, setOrgId] = useState("");
  const [orgName, setOrgName] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [signupLink, setSignupLink] = useState("");
  const [thumbnailPicture, setThumbnailPicture] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [popupMessage, setPopupMessage] = useState("");
  const [popupVariant, setPopupVariant] = useState("success");

  const showPopup = (message, variant = "success") => {
    setPopupMessage(message);
    setPopupVariant(variant);
    setTimeout(() => setPopupMessage(""), 5000);
  };

  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const handleCancel = () => {
    setShowCancelPopup(true);
  };

  const confirmCancel = () => {
    window.location.href = "/";
  };

  const closeCancelPopup = () => {
    setShowCancelPopup(false);
  };

  const handleSaveDraft = () => {
    showPopup("Saved as draft. Find your drafts in 'My events'", "success");
  };

  const handlePostNow = async () => {
    try {
      const savedObj = await SaveEventToDB({
        orgId,
        title,
        description,
        startTime,
        endTime,
        startDate,
        endDate,
        thumbnailPicture,
        signupLink,
      });

      console.log("Event saved with ID:", savedObj.id);
      showPopup("Event posted!", "success");
    } catch (error) {
      console.error("Error saving event:", error);
      showPopup("An error occurred while posting.", "error");
    }
  };

  useEffect(() => {
    const loadOrg = async () => {
      const name = await returnOrgNameForAdminUser(currentUser);
      setOrgName(name || "Unknown organization");
      const id = await returnOrgIdForAdminUser(currentUser);
      setOrgId(id || null);
    };
    loadOrg();
  }, [currentUser]);

  return (
    <main className="createevent-container">
      <h2 className="createevent-title">
        Create an event for <span id="org-name">{orgName}</span>
      </h2>

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

      <InputField
        label="Signup link"
        placeholder="Add URL for signup"
        value={signupLink}
        onChange={(e) => setSignupLink(e.target.value)}
      />

      <div className="button-group">
        <Button variant="tertiary" size="large" onClick={handleCancel}>
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

      {popupMessage && (
        <div className={`draft-popup ${popupVariant}`}>{popupMessage}</div>
      )}

      {showCancelPopup && (
        <div className="cancel-popup-overlay">
          <div className="cancel-popup">
            <p>
              Are you sure you want to cancel?
              <br />
              All progress will be lost
            </p>

            <div className="cancel-popup-buttons">
              <Button variant="tertiary" onClick={closeCancelPopup}>
                No
              </Button>

              <Button variant="primary" onClick={confirmCancel}>
                Yes, cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CreateEvent;
