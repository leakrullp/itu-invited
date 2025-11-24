import "./EventCard.css";
import { useState } from "react";
import { TopicTag, Button, FavoriteButton } from "../index";

export default function EventCard({
  title,
  organisation,
  img,
  tags = [],
  startTime,
  endTime,
  signupLink,
  favorited,
}) {
  const [isFavorited, setIsFavorited] = useState(favorited);

  // Date helpers
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);

  const formatTime = (time) =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(time);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const start = new Date(startTime);
  const end = endTime ? new Date(endTime) : null; //objects that are null evaluate to "false" when looked at as a boolean

  let displayDate = "";
  let displayTime = "";

  if (!end) {
    //We only have start time
    displayDate = formatDate(start);
    displayTime = formatTime(start);
  } else if (isSameDay(start, end)) {
    // Start and end are on same day
    displayDate = formatDate(start);
    displayTime = `${formatTime(start)} – ${formatTime(end)}`;
  } else {
    // Start and end are on different days
    displayDate = `${formatDate(start)} at ${formatTime(start)} –
                   ${formatDate(end)} at ${formatTime(end)}`;
    displayTime = "";
  }

  const MAX_VISIBLE_TAGS = 4;
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = tags.length - visibleTags.length;

  function handleFavorite() {
    // TODO: save to user's favorites
    console.log("Toggle favorite for", title);
    setIsFavorited(!isFavorited);
  }

  return (
    <article className="card">
      <img src={img} alt={title} className="image" />

      <div className="all-text">
        <h2 className="organisation">{organisation}</h2>

        <h2 className="headline">{title}</h2>

        <div className="date-time-wrapper">
          <h2 className="event-time">{displayDate}</h2>
          {displayTime && <h2 className="event-time">{displayTime}</h2>}
        </div>

        <div className="event-tags">
          {visibleTags.map((tags, i) => (
            <TopicTag key={i} text={tags} variant="read" />
          ))}
          {hiddenCount > 0 && (
            <TopicTag text={`+${hiddenCount}`} variant="read" />
          )}
        </div>

        <div className="bottom-btn-group">
          <FavoriteButton onClick={handleFavorite} />

          {signupLink && (
            <Button
              variant="secondary"
              size="small"
              onClick={() => window.open(signupLink)}
            >
              Go to sign up
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
