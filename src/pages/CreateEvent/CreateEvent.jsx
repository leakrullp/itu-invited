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
import { toast } from "react-toastify";

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

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSignupLink("");
    setThumbnailPicture(null);

    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
  };

  const handleCancel = () => {
    setShowCancelPopup(true);
  };

  const confirmCancel = () => {
    toast.info("Event creation cancelled", {
      theme: "colored",
      autoClose: 2000,
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  const closeCancelPopup = () => {
    setShowCancelPopup(false);
  };

  const handleSaveDraft = () => {
    toast.success("Saved as draft. Find your drafts in 'My events'", {
      theme: "colored",
      autoClose: 5000,
    });
  };

  const handlePostNow = async () => {
    try {
      setIsPosting(true);

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
      toast.success("Event posted successfully!", {
        theme: "colored",
        autoClose: 1500,
      });

      resetForm(); //clears form
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error("Failed to post event. Please try again.", {
        theme: "colored",
        autoClose: 5000,
      });
    } finally {
      setIsPosting(false);
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
          disabled={isPosting}
        >
          {isPosting ? "Posting..." : "Post now"}
        </Button>
      </div>

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
