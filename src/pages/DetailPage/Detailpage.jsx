import "./DetailPage.css";

export default function DetailPage({ event, onClose }) {
  if (!event) return null;

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));

  const formatTime = (date) =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-card" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button className="close-btn" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Image */}
        <img src={event.img} alt={event.title} className="detail-img" />

        {/* Reuse the 2 classnames that looked good */}
        <h2 className="headline">{event.title}</h2>
        <h2 className="organisation">{event.organisation}</h2>

        {/* Date (simple text, NOT the huge eventcard version) */}
        <p className="detail-time">
          {formatDate(event.startTime)} {formatTime(event.startTime)}
          {event.endTime && (
            <>
              {" "}
              – {formatDate(event.endTime)} {formatTime(event.endTime)}
            </>
          )}
        </p>

        {/* Description */}
        <p className="description">{event.description}</p>

        {/* Signup button */}
        {event.signupLink && (
          <a
            href={event.signupLink}
            className="btn btn--primary btn--small"
            target="_blank"
          >
            Go to signup
          </a>
        )}
      </div>
    </div>
  );
}
