import { useState } from "react";
import { useCreateEventForm } from "./useCreateEventForm";
import { useOrgForAdmin } from "./useOrgForAdmin";
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
    resetForm,
  } = useCreateEventForm();

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const [serverErrors, setServerErrors] = useState([]);

  const errorsToString = (serverErrors) =>
    serverErrors.map((err) => err.message).join("\n");

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

  //Need refactor to individual messages
  const handlePostNow = async () => {
    if (!title || !startDate || !startTime || !endDate || !endTime) {
      toast.error("Please fill in all required fields (*) before posting.", {
        theme: "colored",
      });
      return;
    }

    try {
      setIsPosting(true);
      setServerErrors([]);

      const payload = {
        orgId,
        title,
        description,
        startTime,
        endTime,
        startDate,
        endDate,
      };

      // Validate first (server-side)
      const result = await Parse.Cloud.run("validateCreateEvent", payload);

      if (!result.ok) {
        setServerErrors(result.errors);
        console.log(errorsToString());
        toast.error(errorsToString(), { theme: "colored" });
        return; // stop — do NOT save
      }

      //Save only if valid
      const savedObj = await SaveEventToDB({
        ...payload,
        thumbnailPicture,
      });

      console.log("Event saved with ID:", savedObj.id);

      toast.success("Event posted successfully!", {
        theme: "colored",
        autoClose: 5000,
      });

      resetForm();
    } catch (error) {
      console.error("Error saving event:", error);

      toast.error(error.message || "Failed to post event. Please try again.", {
        theme: "colored",
        autoClose: 5000,
      });
    } finally {
      setIsPosting(false);
    }
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
