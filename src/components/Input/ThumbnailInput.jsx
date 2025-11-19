import { useState } from "react";
import Button from "../../components/Button/Button.jsx";
import "./Input.css";
import Parse from "parse";

export default function ThumbnailInput({ onThumbnailSaved }) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    // Create a Parse File
    const parseFile = new Parse.File(file.name, file);

    // Save file to Back4App
    await parseFile.save();

    // Create Picture object
    const Picture = Parse.Object.extend("Picture");
    const pictureObj = new Picture();

    pictureObj.set("file", parseFile);

    // Save Picture object
    const savedPicture = await pictureObj.save();

    setUploading(false);

    // Send pointer back to parent
    onThumbnailSaved(savedPicture);
  }

  return (
    <div className="thumbnail-upload">
      <label>
        <Button
          variant="tertiary"
          size="large"
          icon="image"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload thumbnail"}
        </Button>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
}
