import { useRef, useState, useEffect } from "react";
import Button from "../../components/Button/Button.jsx";
import Parse from "parse";
import "./Input.css";

export default function ThumbnailInput({ onThumbnailSaved }) {
  const [uploading, setUploading] = useState(false);
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

    setUploading(true);

    try {
      const parseFile = new Parse.File("thumbnail.png", file, "image/png");
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
    <div className="thumbnail-upload">
      <Button
        variant="tertiary"
        size="large"
        icon="image"
        disabled={uploading}
        onClick={() => fileInputRef.current.click()}
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
