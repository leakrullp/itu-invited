import { useRef, useState, useEffect } from "react";
import { Button } from "../index";
import Parse from "parse";
import "./Input.css";

export default function ThumbnailInput({ onThumbnailSaved }) {
  const [uploading, setUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);
  const isMounted = useRef(true);
  const [previewUrl, setPreviewUrl] = useState(null);

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
      const parseFile = new Parse.File(file.name, file, "image/png");
      await parseFile.save();

      const Picture = Parse.Object.extend("Picture");
      const pictureObj = new Picture();
      pictureObj.set("fileName", parseFile);
      const savedPicture = await pictureObj.save();

      if (isMounted.current) {
        onThumbnailSaved(savedPicture);
        setUploading(false);
      }
    } catch (err) {
      if (isMounted.current) setUploading(false);
      console.error(err);
    }
  }

  return (
    <>
      <div
        className={`upload-button-wrapper ${
          previewUrl ? "has-preview" : "no-preview"
        }`}
        style={{ backgroundImage: previewUrl ? `url(${previewUrl})` : "none" }}
      >
        {/* Define input taken from the button*/}
        <input
          id="thumbnail-upload"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {/* Button to upload picture*/}
        <label htmlFor="thumbnail-upload">
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current.click()}
            className={`btn btn--large btn--tertiary thumbnail-button ${
              previewUrl ? "has-preview" : ""
            }`}
          >
            <span className="material-symbols-outlined">image</span>
            {previewUrl ? "Change Thumbnail" : "Upload Thumbnail"}
          </button>
        </label>

        {/* Text under upload button based on if a file is chosen or not*/}
        <p>
          {uploading
            ? "Uploading..."
            : selectedFileName
            ? ""
            : "No file selected"}
        </p>
      </div>
    </>
  );
}
