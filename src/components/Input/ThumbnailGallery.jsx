import { useState, useEffect } from "react";
import Parse from "parse";

// Component for showing and selecting already uploaded thumbnail pictures
export default function ThumbnailGallery({ open, onSelect }) {
  const [pictures, setPictures] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!open) return;

    async function loadPictures() {
      try {
        const Picture = Parse.Object.extend("Picture");
        const query = new Parse.Query(Picture);
        const results = await query.find();

        const pictureObjects = results
          .map((obj) => {
            const file = obj.get("fileName");
            if (!file) return null;

            return {
              objectId: obj.id,
              url: file.url(),
              fullObj: obj,
            };
          })
          .filter(Boolean);

        setPictures(pictureObjects);
      } catch (err) {
        console.error("Error loading pictures:", err);
      }
    }

    loadPictures();
  }, [open]);

  if (!open) return null;

  return (
    <div className="show-gallery-container">
      <div className="gallery-grid">
        {pictures.map((pic) => (
          <img
            key={pic.objectId}
            src={pic.url}
            alt=""
            className={`gallery-image ${
              selectedId === pic.objectId ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedId(pic.objectId);
              onSelect(pic);
            }}
          />
        ))}
      </div>
    </div>
  );
}
