import "./EventCard.css";
import { TopicTag, Button, FavoriteButton } from "../index";
import { toggleFavorite } from "../../pages/Favorites/favoriteService";
import { formatDate, formatTime, isSameDay } from "./dateService";
import useFavoriteUIState from "../../hooks/useFavoriteUIState";

const MAX_VISIBLE_TAGS = 4;

export default function EventCard({
  id,
  title,
  organisation,
  img,
  tags = [],
  startTime,
  endTime,
  signupLink,
  onClick,
  onRemove,
}) {
  // const [isFavorited, setIsFavorited] = useState(favorited);
  const { favorites, setFavorite } = useFavoriteUIState();
  const isFavorited = favorites[id] ?? false;

  async function handleFavorite() {
    if (!id) return console.error("Missing event ID");

    console.log("You added this to favorites:", id, title);

    try {
      const newState = await toggleFavorite(id); // backend toggle
      setFavorite(id, newState); // update global UI

      if (!newState && onRemove) {
        // remove from parent immediately
        onRemove(id);
      }
    } catch (err) {
      console.error("Favorite error:", err);
    }
  }

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

  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = tags.length - visibleTags.length;

  return (
    <article className="card" onClick={onClick}>
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
          <FavoriteButton isFavorited={isFavorited} onClick={handleFavorite} />

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
