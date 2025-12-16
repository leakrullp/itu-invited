import { useRef, useState, useEffect } from "react";
import { Button } from "../index";
import Parse from "parse";
import "./Input.css";

export default function ThumbnailInput({ onThumbnailSaved }) {
  const [uploading, setUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
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
      <div className="upload-button-wrapper">
        <input
          id="thumbnail-upload"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <label htmlFor="thumbnail-upload">
          <Button
            variant="tertiary"
            size="large"
            icon="image"
            disabled={uploading}
            onClick={() => fileInputRef.current.click()}
          >
            Upload thumbnail
          </Button>
        </label>
        <p>
          {uploading ? "Uploading..." : selectedFileName || "No file selected"}
        </p>
      </div>
      <p>fhjsjgk</p>
    </>
  );
}
