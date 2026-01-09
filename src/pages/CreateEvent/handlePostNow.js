import { toast } from "react-toastify";
import Parse from "parse";
import { SaveEventToDB } from "./SaveEventToDB";

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

    //Save only if valid
    const savedObj = await SaveEventToDB({
      ...payload,
      thumbnailPicture,
      isPosted: true,
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
}
