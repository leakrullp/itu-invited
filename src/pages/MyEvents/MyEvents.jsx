import { Button, StatusTag } from "../../components/index.js";
import getEvents from "../../services/GetEventsService";
import {
  formatDate,
  formatTime,
  isSameDay,
} from "../../components/EventCard/dateService";
import { useEffect, useState } from "react";
import "./MyEvents.css";
import Loading from "../../toasts/Loading.jsx";

export const MyEvents = () => {
  const storedOrg = JSON.parse(localStorage.getItem("organisation")); //store organisations in local storage
  const organisationId = storedOrg?.orgId ?? null; //check i there is an OrgID, if yes store in local, if no null
  const organisationName = storedOrg?.orgName ?? "My Events";
  const [isLoading, setIsLoading] = useState(false);

  const [myEvents, setMyEvents] = useState([]);
  const totalMyEvents = myEvents.length;

  // Date logic
  function getEventDateText(event) {
    const start = new Date(event.startTime);
    const end = event.endTime ? new Date(event.endTime) : null; //objects that are null evaluate to "false" when looked at as a boolean

    if (!end) {
      //We only have start time
      return `${formatDate(start)} at ${formatTime(start)}`;
    } else if (isSameDay(start, end)) {
      // Start and end are on same day
      return `${formatDate(start)} at ${formatTime(start)} – ${formatTime(
        end
      )}`;
    } else {
      // Start and end are on different days
      return `${formatDate(start)} at ${formatTime(start)} – ${formatDate(
        end
      )} at ${formatTime(end)}`;
    }
  }

  useEffect(() => {
    async function loadEvents() {
      if (!organisationId) return;
      setIsLoading(true); //use loading from toast

      try {
        const events = await getEvents({ organisationId }); //use function from GetEventsService that stores all filters.
        setMyEvents(events); //save the setMyEvents in the useState
      } finally {
        setIsLoading(false);
      }
    }

    loadEvents();
  }, [organisationId]);

  return (
    <main className="myevents-container">
      <h2 className="myevents-title">
        {organisationName} events ({totalMyEvents})
      </h2>
      {isLoading ? (
        <Loading text="Loading your events..." />
      ) : (
        <div className="myevents-list">
          {myEvents.map((event) => (
            <div key={event.id} className="myevent-card">
              <img
                src={event.img}
                alt={event.title}
                className="myevent-image"
              />
              <div className="myevent-content">
                <div className="myevent-header">
                  <h3 className="myevent-headline">{event.title}</h3>
                  <StatusTag
                    variant={event.status === "Posted" ? "posted" : "draft"}
                  />
                </div>
                <>
                  <p className="myevent-date">{getEventDateText(event)}</p>
                </>
                <p className="myevent-description">{event.description}</p>
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
      )}
    </main>
  );
};
