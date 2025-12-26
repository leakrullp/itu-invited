import { useState, useEffect } from "react";
import Parse from "parse";
import { returnOrgIdForAdminUser } from "../../pages/CreateEvent/LoadOrganizationData";

// Component for showing and selecting already uploaded thumbnail pictures
export default function ThumbnailGallery({ open, onSelect }) {
  const [pictures, setPictures] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!open) return;

    async function loadPictures() {
      try {
        const Picture = Parse.Object.extend("Picture");
        const query = new Parse.Query(Picture);
        const orgID = await returnOrgIdForAdminUser(Parse.User.current()); //find ID of current user

        // How many thumbnail pictures to fetch from DB
        query.limit(8);
        query.skip(page * 8);
        query.equalTo("orgID", orgID);

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
  }, [open, page]); // Re-run when gallery opens or page changes

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

      {/* Pagination controls for navigating through gallery */}
      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
        {/* Go to previous page */}
        <button
          type="button"
          className="btn btn--tertiary"
          disabled={page === 0}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        >
          Previous
        </button>

        {/* Go to next page */}
        <button
          type="button"
          className="btn btn--tertiary"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
