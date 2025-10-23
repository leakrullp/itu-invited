// Summary: Renders a single event card with information like organization, headline, date, time, and tags.

import React from "react";

export default function Entry(props) {
  return (
    <article className="Card">
      {/* Event image */}
      <img src={props.img} alt={props.name} className="Image" />

      {/* Organization name */}
      <h2 className="Organisation">{props.organisation}</h2>

      {/* Event headline */}
      <h2 className="Headline">{props.headline}</h2>

      {/* Date and time details */}
      <h2 className="Date">{props.date}</h2>
      <h2 className="Time">{props.time}</h2>

      {/* Event tags */}
      <h2 className="Tags">{props.tags}</h2>
    </article>
  );
}
