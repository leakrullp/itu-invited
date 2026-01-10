import { toast } from "react-toastify";
import Parse from "parse";
import { SaveEventToDB } from "./SaveEventToDB";

//helper function to build

export async function handlePostNow({
  setIsPosting,
  payload,
  thumbnailPicture,
  resetForm,
  errorsToString,
}) {
  try {
    setIsPosting(true);

    // Validate first (server-side)
    const result = await Parse.Cloud.run("validateCreateEvent", payload);

    if (!result.ok) {
      const msg = errorsToString(result.errors);
      toast.error(msg, { theme: "colored" });
      return; // stop — do NOT save
    }

    // convert time and date to DateTime formart
    const startTimeDate =
      payload.startDate && payload.startTime
        ? new Date(`${payload.startDate}T${payload.startTime}`)
        : null;

    const endTimeDate =
      payload.endDate && payload.endTime
        ? new Date(`${payload.endDate}T${payload.endTime}`)
        : null;

    //Save only if valid
    const savedObj = await SaveEventToDB({
      ...payload,
      thumbnailPicture,
      isPosted: true,
    });

    console.log("Event saved with ID:", savedObj.id);
    //remove eventID from localStorage
    localStorage.removeItem("editingEventId");

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
}
