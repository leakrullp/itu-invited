import { useState } from "react";
import Parse from "parse";
import Button from "../../components/Button/Button.jsx";
import "./Input.css";

export default function ShowPictures({ onSelect }) {
  const [pictures, setPictures] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
      if (!open) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    } catch (err) {
      console.error("Error loading pictures:", err);
    }
  }

  function handleSelect(pic) {
    setSelectedId(pic.objectId);
    onSelect(pic.fullObj);
  }

  return (
    <div className="show-gallery-container">
      <Button
        variant="tertiary"
        size="large"
        icon="image"
        onClick={loadPictures}
      >
        Choose thumbnail picture
      </Button>

      {open && (
        <div className="gallery-grid">
          {pictures.map((pic) => (
            <img
              key={pic.objectId}
              src={pic.url}
              alt=""
              className={`gallery-image ${
                selectedId === pic.objectId ? "selected" : ""
              }`}
              onClick={() => handleSelect(pic)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
