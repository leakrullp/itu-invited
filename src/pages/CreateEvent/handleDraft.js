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

    await SaveEventToDB({
      ...payload,
      thumbnailPicture,
      isPosted: false,
    });

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
    setIsPosting(false);
  }
}
