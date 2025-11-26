import { useRef, useState } from "react";
import Button from "../../components/Button/Button.jsx";
import Parse from "parse";
import "./Input.css";

export default function ThumbnailInput({ onThumbnailSaved }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const parseFile = new Parse.File(file.name, file);
    await parseFile.save();

    const Picture = Parse.Object.extend("Picture");
    const pictureObj = new Picture();
    pictureObj.set("file", parseFile);

    const savedPicture = await pictureObj.save();

    setUploading(false);
    onThumbnailSaved(savedPicture);
  }

  return (
    <div className="thumbnail-upload">
      <Button
        variant="tertiary"
        size="large"
        icon="image"
        disabled={uploading}
        onClick={() => fileInputRef.current.click()} // ← trigger input
      >
        {uploading ? "Uploading..." : "Upload thumbnail"}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
