import Parse from "parse";
import { returnOrgForAdminUser } from "../pages/CreateEvent/LoadOrganizationData";

/**
 * Handles thumbnail upload logic and DB persistence.
 * This service is intentionally UI-agnostic.
 */
export default async function uploadThumbnailFile({
  file,
  isMountedRef,
  onThumbnailSaved,
  setUploading,
  setPreviewUrl,
  setShowGallery,
}) {
  if (!file) return;

  setUploading(true);

  // URL for picture uploadet to DB, for previewing thumbnail picture
  setPreviewUrl(URL.createObjectURL(file));

  try {
    const parseFile = new Parse.File(file.name, file);
    await parseFile.save();

    const Picture = Parse.Object.extend("Picture");
    const pictureObj = new Picture();
    pictureObj.set("fileName", parseFile);

    const { orgId: orgID } = await returnOrgForAdminUser(Parse.User.current()); //find ID of current user
    pictureObj.set(
      "orgID",
      orgID
    ); /* send orgID to DB so when it fetches pictures from DB it filters on current org id */

    const savedPicture = await pictureObj.save();

    if (isMountedRef.current) {
      onThumbnailSaved(savedPicture);
      setUploading(false);
      setShowGallery(false);
    }
  } catch (err) {
    if (isMountedRef.current) setUploading(false);
    console.error(err);
  }
}
