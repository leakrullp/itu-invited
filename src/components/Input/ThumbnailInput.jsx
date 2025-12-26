import { useRef, useState, useEffect } from "react";
import Parse from "parse";
import "./Input.css";
import ThumbnailGallery from "./ThumbnailGallery.jsx";
import { returnOrgIdForAdminUser } from "../../pages/CreateEvent/LoadOrganizationData";

export default function ThumbnailInput({ onThumbnailSaved }) {
  const [uploading, setUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  const fileInputRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFileName(file.name);
    setUploading(true);

    // URL for picture uploadet to DB, for previewing thumbnail picture
    setPreviewUrl(URL.createObjectURL(file));

    try {
      const parseFile = new Parse.File(file.name, file);
      await parseFile.save();

      const Picture = Parse.Object.extend("Picture");
      const pictureObj = new Picture();
      pictureObj.set("fileName", parseFile);
      const orgID = await returnOrgIdForAdminUser(Parse.User.current()); //find ID of current user
      pictureObj.set(
        "orgID",
        orgID
      ); /* send orgID to DB so when it fetches pictures from DB it filters on current org id */
      const savedPicture = await pictureObj.save();

      if (isMounted.current) {
        onThumbnailSaved(savedPicture);
        setUploading(false);
        setShowGallery(false);
      }
    } catch (err) {
      if (isMounted.current) setUploading(false);
      console.error(err);
    }
  }

  function handleGallerySelect(pic) {
    setPreviewUrl(pic.url);
    onThumbnailSaved(pic.fullObj);
    setShowGallery(false);
  }

  return (
    <>
      <div className="upload-button-wrapper">
        {/* Preview image shown when a thumbnail is selected */}
        {previewUrl && (
          <div
            className="thumbnail-preview"
            style={{ backgroundImage: `url(${previewUrl})` }}
          />
        )}
        {/* Hidden file input */}
        <input
          id="thumbnail-upload"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {/* Status text */}
        {!previewUrl && (
          <p>
            {uploading
              ? "Uploading..."
              : selectedFileName
              ? ""
              : "No file selected"}
          </p>
        )}
        {/* Button row placed underneath preview image */}
        <div className="thumbnail-buttons-row">
          {/* Upload button */}
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current.click()}
            className="btn btn--large btn--tertiary thumbnail-button"
          >
            <span className="material-symbols-outlined">upload</span>
            Upload Thumbnail
          </button>

          {/* Gallery button */}
          <button
            type="button"
            className="btn btn--large btn--tertiary thumbnail-button"
            onClick={() => setShowGallery((prev) => !prev)}
          >
            <span className="material-symbols-outlined">image</span>
            Choose from Gallery
          </button>
        </div>
      </div>

      {/* Gallery */}
      <ThumbnailGallery open={showGallery} onSelect={handleGallerySelect} />
    </>
  );
}
