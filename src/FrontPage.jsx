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

  useEffect(() => {
    async function loadEvents() {
      const eventData = await getEvents({ onlyFuture: true });
      setEvents(eventData);
      setIsLoading(false);
    }
    loadEvents();
  }, []); //dependency array is empty, but needs connection to FilterSidebar eventually

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
        <FilterSidebar />
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
