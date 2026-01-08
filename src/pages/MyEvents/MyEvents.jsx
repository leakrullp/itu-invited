import { Button, StatusTag } from "../../components/index.js";
import getEvents from "../../services/GetEventsService";
import { useEffect, useState } from "react";
import "./MyEvents.css";

export const MyEvents = () => {
  const storedOrg = JSON.parse(localStorage.getItem("organisation"));
  const organisationId = storedOrg?.orgId ?? null;
  const organisationName = storedOrg?.orgName ?? "My Events";

  const [myEvents, setMyEvents] = useState([]);
  const totalMyEvents = myEvents.length;

  useEffect(() => {
    async function loadEventsCount() {
      if (!organisationId) return;

      const events = await getEvents({ organisationId });
      setMyEvents(events);
    }

    loadEventsCount();
  }, [organisationId]);

  console.log("organisationId:", organisationId);

  console.log({ MyEvents });
  return (
    <main className="myevents-container">
      <h2 className="myevents-title">
        {organisationName} events ({totalMyEvents})
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
