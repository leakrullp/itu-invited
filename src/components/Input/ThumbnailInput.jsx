import { useState } from "react";
import TopicTag from "../TopicTag/TopicTag.jsx";
import Button from "../../components/Button/Button.jsx";
import "./Input.css";

export default function ThumbnailInput() {
  return (
    <div className="thumbnail-upload">
      <Button variant="tertiary" size="large" icon="image">
        Upload thumbnail
      </Button>
    </div>
  );
}
