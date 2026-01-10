import { toast } from "react-toastify";
import { SaveEventToDB } from "./SaveEventToDB";

export async function handleDraft({
  setIsDrafting,
  payload,
  thumbnailPicture,
  resetForm,
}) {
  try {
    setIsDrafting(true);

    //transform start and end time to DateTime format
    const startTimeDate =
      payload.startDate && payload.startTime
        ? new Date(`${payload.startDate}T${payload.startTime}`)
        : null;

    const endTimeDate =
      payload.endDate && payload.endTime
        ? new Date(`${payload.endDate}T${payload.endTime}`)
        : null;

    await SaveEventToDB({
      ...payload,
      thumbnailPicture,
      isPosted: false,
    });

    //remove eventID from localStorage
    localStorage.removeItem("editingEventId");

    toast.success("Saved as draft", {
      theme: "colored",
      autoClose: 3500,
    });

    resetForm();
    setTimeout(() => {
      window.location.href = "/myevents";
    }, 3500);
  } catch (error) {
    console.error("Error saving draft:", error);

    toast.error(error.message || "Failed to save draft. Please try again.", {
      theme: "colored",
      autoClose: 5000,
    });
  } finally {
    setIsDrafting(false);
  }
}
