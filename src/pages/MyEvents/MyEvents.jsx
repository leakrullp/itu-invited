import { Button, StatusTag } from "../../components/index.js";
import getEvents from "../../services/GetEventsService";
import { deleteEvent } from "../../services/deleteEventService";
import {
  formatDate,
  formatTime,
  isSameDay,
} from "../../components/EventCard/dateService";
import { useEffect, useState } from "react";
import "./MyEvents.css";
import Loading from "../../toasts/Loading.jsx";
import { toast } from "react-toastify";

export const MyEvents = () => {
  //1. States
  const [isLoading, setIsLoading] = useState(false);
  const [myEvents, setMyEvents] = useState([]);

  const [eventToDelete, setEventToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  //2. derived values from DB via parse. Save on local storage
  const storedOrg = JSON.parse(localStorage.getItem("organisation")); //store organisations in local storage
  const organisationId = storedOrg?.orgId ?? null; //check i there is an OrgID, if yes store in local, if no null
  const organisationName = storedOrg?.orgName ?? "My Events";

  const totalMyEvents = myEvents.length;

  //2.1. formatting for data logic (reuse of code)
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

  //3. handlers
  const handleDeleteClick = (event) => {
    setEventToDelete(event);
  };
  const cancelDelete = () => {
    setEventToDelete(null);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;
    try {
      setIsDeleting(true);
      await deleteEvent(eventToDelete.id);
      setMyEvents((prev) => prev.filter((e) => e.id !== eventToDelete.id));

      toast.success(`"${eventToDelete.title}" deleted`, {
        theme: "colored",
      });
    } catch (err) {
      toast.error("Failed to delete event", { theme: "colored" });
    } finally {
      setIsDeleting(false);
      setEventToDelete(null);
    }
  };

  //4. useeffects
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

  //5. rendering
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
                  <StatusTag variant={event.isPosted ? "posted" : "draft"} />
                </div>

                <p className="myevent-date">{getEventDateText(event)}</p>

                <p className="myevent-description">{event.description}</p>

                <div className="myevent-bottom">
                  <div className="myevent-actions">
                    <Button
                      variant="tertiary"
                      size="small"
                      icon="delete"
                      onClick={() => handleDeleteClick(event)}
                    >
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
      {eventToDelete && (
        <div className="cancel-popup-overlay">
          <div className="cancel-popup">
            <p>
              Are you sure you want to delete the event:
              <br />
              <strong>{eventToDelete.title}</strong> ?
            </p>

            <div className="cancel-popup-buttons">
              <Button variant="tertiary" onClick={cancelDelete}>
                No
              </Button>

              <Button
                variant="primary"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
