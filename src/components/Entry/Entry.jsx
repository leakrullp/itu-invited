// Summary: Renders a single event card with information like organization, headline, date, time, and tags.
import "./Entry.css";
import TopicTag from "../TopicTag/TopicTag.jsx";
import Button from "../Button/Button.jsx";
import { useState } from "react";

export default function Entry(props) {
  const [isFavorited, setIsFavorited] = useState(props.favorited);

  return (
    <article className="Card">
      {/* Event image */}
      <img src={props.img} alt={props.name} className="Image" />

      <div className="AllText">
        {/* Organization name */}
        <h2 className="Organisation">{props.organisation}</h2>

        {/* Event headline */}
        <h2 className="Headline">{props.headline}</h2>

        {/* Date and time details */}
        <div className="DateTime">
          <h2 className="Date">{props.date}</h2>
          <h2 className="Time">{props.time}</h2>
        </div>

        {/* Event tags */}
        <div className="Tags">
          {props.tags.map((tag, index) => (
            <TopicTag key={index} text={tag} variant="read" />
          ))}
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
