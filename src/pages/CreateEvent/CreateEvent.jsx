import Parse from "parse";
import { useState } from "react";
import { useCreateEventForm } from "./useCreateEventForm";
import { useOrgForAdmin } from "./useOrgForAdmin";
import {
  Button,
  DatetimeInput,
  InputField,
  TagInputField,
  TextAreaField,
  ThumbnailInput,
} from "../../components";
import "./CreateEvent.css";
import { SaveEventToDB } from "./SaveEventToDB";
import { handlePostNow } from "./handlePostNow";
import { toast } from "react-toastify";

export const CreateEvent = ({ currentUser }) => {
  const { orgId, orgName } = useOrgForAdmin(currentUser);
  const {
    title,
    setTitle,
    description,
    setDescription,
    signupLink,
    setSignupLink,
    thumbnailPicture,
    setThumbnailPicture,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    keyWords,
    setKeyWords,
    resetForm,
  } = useCreateEventForm();

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const errorsToString = (errors = []) =>
    errors.map((err) => err.message).join("\n");

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

  return (
    <main className="createevent-container">
      <h2 className="createevent-title">
        Create an event for <span id="org-name">{orgName}</span>
      </h2>

      <ThumbnailInput onThumbnailSaved={setThumbnailPicture} />

      <InputField
        label={
          <>
            Title<span className="required-star">*</span>
          </>
        }
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

      <TagInputField
        label="Tags to describe your event"
        value={keyWords}
        onChange={setKeyWords}
      />

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
          onClick={() =>
            handlePostNow({
              setIsPosting,
              payload: {
                orgId,
                title,
                description,
                signupLink,
                startTime,
                endTime,
                startDate,
                endDate,
              },
              thumbnailPicture,
              resetForm,
              errorsToString,
            })
          }
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
