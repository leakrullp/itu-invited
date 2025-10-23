// Summary: Renders a single event card with information like organization, headline, date, time, and tags.

import React from "react";
import "./Entry.css";

export default function Entry(props) {
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
    <span key={index} className="Tag">
      {tag}
    </span>
  ))}
</div>
      </div>
    </article>
  );
}
