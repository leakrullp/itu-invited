import "./EventCard.css";
import { useState } from "react";
import { TopicTag, Button } from "../index";

export default function EventCard(props) {
  const [isFavorited, setIsFavorited] = useState(props.favorited);

  const MAX_VISIBLE_TAGS = 4;
  const visibleTags = props.tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = props.tags.length - visibleTags.length;

  return (
    <article className="card">
      <img src={props.img} alt={props.name} className="image" />

      <div className="all-text">
        <h2 className="organisation">{props.organisation}</h2>

        <h2 className="headline">{props.headline}</h2>

        <div className="date-time-wrapper">
          <h2 className="event-date">{props.date}</h2>
          <h2 className="event-time">{props.time}</h2>
        </div>

        <div className="event-tags">
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

// old EventCard

// function EventCard(props) {
//   const [isFavorited, setIsFavorited] = useState(props.favorited);

//   const maxVisibleTags = 4;
//   const visibleTags = props.tags.slice(0, maxVisibleTags);
//   const hiddenCount = props.tags.length - visibleTags.length;

//   return (
//     <article className="Card">
//       <img src={props.img} alt={props.name} className="Image" />

//       <div className="AllText">
//         <h2 className="Organisation">{props.organisation}</h2>

//         <h2 className="Headline">{props.headline}</h2>

//         <div className="DateTime">
//           <h2 className="Date">{props.date}</h2>
//           <h2 className="Time">{props.time}</h2>
//         </div>

//         <div className="Tags">
//           {visibleTags.map((tag, i) => (
//             <TopicTag key={i} text={tag} variant="read" />
//           ))}
//           {hiddenCount > 0 && (
//             <TopicTag text={`+${hiddenCount}`} variant="read" />
//           )}
//         </div>

//         <div className="bottom-btn-group">
//           <Button
//             variant={isFavorited ? "primary" : "tertiary"}
//             icon="bookmark"
//             onClick={() => setIsFavorited(!isFavorited)}
//           />

//           <Button variant="secondary" size="small">
//             Go to sign up
//           </Button>
//         </div>
//       </div>
//     </article>
//   );
// }
