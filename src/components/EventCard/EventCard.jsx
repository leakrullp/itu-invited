// Summary: Renders a single event card with information like organization, headline, date, time, and tags.
import { useState } from "react";

import "./EventCard.css";
import TopicTag from "../TopicTag/TopicTag.jsx";
import Button from "../Button/Button.jsx";

export default function EventCard(props) {
  const [isFavorited, setIsFavorited] = useState(props.favorited);

  const maxVisibleTags = 4;
  const visibleTags = props.tags.slice(0, maxVisibleTags);
  const hiddenCount = props.tags.length - visibleTags.length;

  return (
    <article className="Card">
      <img src={props.img} alt={props.name} className="Image" />

      <div className="AllText">
        <h2 className="Organisation">{props.organisation}</h2>

        <h2 className="Headline">{props.headline}</h2>

        <div className="DateTime">
          <h2 className="Date">{props.date}</h2>
          <h2 className="Time">{props.time}</h2>
        </div>

        <div className="Tags">
          {visibleTags.map((tag, i) => (
            <TopicTag key={i} text={tag} variant="read" />
          ))}
          {hiddenCount > 0 && (
            <TopicTag text={`+${hiddenCount}`} variant="read" />
          )}
        </div>

        <div className="bottom-btn-group">
          <Button
            variant={isFavorited ? "primary" : "tertiary"}
            icon="bookmark"
            onClick={() => setIsFavorited(!isFavorited)}
          />

          <Button variant="secondary" size="small">
            Go to sign up
          </Button>
        </div>
      </div>
    </article>
  );
}
