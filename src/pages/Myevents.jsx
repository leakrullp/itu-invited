import Button from "../components/Button/Button.jsx";
import StatusTag from "../components/StatusTag/StatusTag.jsx";
import data from "../assets/Data/Data.js";
import "./Myevents.css";

export const Myevents = () => {
  const myEvents = data;
  const totalMyEvents = myEvents.length;

  return (
    <main className="myevents-container">
      <h2 className="myevents-title">
        ITU Underground Events ({totalMyEvents})
      </h2>

      <div className="myevents-list">
        {myEvents.map((event) => (
          <div key={event.img} className="myevent-card">
            <img src={event.img} alt={event.title} className="myevent-image" />

            <div className="myevent-content">
              <div className="myevent-header">
                <h3 className="myevent-headline">{event.headline}</h3>
                <StatusTag
                  variant={event.status === "Posted" ? "posted" : "draft"}
                />
              </div>

              <p className="myevent-date">{event.date}</p>
              <p className="myevent-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <div className="myevent-bottom">
                <div className="myevent-actions">
                  <Button variant="tertiary" size="small" icon="delete">
                    Delete
                  </Button>
                  <Button variant="secondary" size="small" icon="edit">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
