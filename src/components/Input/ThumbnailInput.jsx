import { useRef, useState, useEffect } from "react";
import "./Input.css";
import ThumbnailGallery from "./ThumbnailGallery.jsx";
import uploadThumbnailFile from "../../services/ThumbnailUploadService";

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

    await uploadThumbnailFile({
      file,
      isMountedRef: isMounted,
      onThumbnailSaved,
      setUploading,
      setPreviewUrl,
      setShowGallery,
    });
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
