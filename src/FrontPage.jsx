import { FilterSidebar, EventCard } from "./components";
import { useEffect, useState } from "react";
import "./index.css";
import Parse from "parse";
import DetailPage from "./pages/DetailPage/Detailpage";
import Loading from "./toasts/Loading";
import getEvents from "./services/GetEventsService.js";

export default function FrontPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pastEvents, setPastEvents] = useState(false);

  function handlePastEventsToggle() {
    setPastEvents((prev) => !prev);
  }

  useEffect(() => {
    async function loadEvents() {
      setIsLoading(true);
      const eventData = await getEvents({
        onlyFuture: !pastEvents,
        isPosted: true,
      });
      setEvents(eventData);
      setIsLoading(false);
    }
    loadEvents();
  }, [pastEvents]); //dependency array is empty, but needs connection to FilterSidebar eventually

  return (
    <>
      <section className="grid-container">
        <div className="event-count">
          <h2>
            {events.length < 1 ? "" : "Events " + "(" + events.length + ")"}
          </h2>
        </div>
        {isLoading && <Loading text="Loading events..." />}

        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            {...event}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </section>
      <aside>
        <FilterSidebar
          pastEvents={pastEvents}
          onTogglePastEvents={handlePastEventsToggle}
        />
      </aside>

      {selectedEvent && (
        <DetailPage
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}
