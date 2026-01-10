import { FilterSidebar, EventCard } from "./components";
import { useEffect, useState } from "react";
import "./index.css";
import DetailPage from "./pages/DetailPage/Detailpage";
import Loading from "./toasts/Loading";
import getEvents from "./services/GetEventsService.js";

export default function FrontPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    selectedClubs: [],
    selectedKeywords: [],
    ituChecked: true,
    studentChecked: true,
    pastEvents: false,
  });

  const resetFilters = () => {
    setFilters({
      selectedClubs: [],
      selectedKeywords: [],
      ituChecked: true,
      studentChecked: true,
      pastEvents: false,
    });
  };

  useEffect(() => {
    async function loadEvents() {
      setIsLoading(true);

      const eventData = await getEvents({
        onlyFuture: !filters.pastEvents,
        ituDriven: filters.ituChecked,
        studentDriven: filters.studentChecked,
        clubs: filters.selectedClubs,
        tags: filters.selectedKeywords,
        isPosted: true,
      });

      setEvents(eventData);
      setIsLoading(false);
    }

    loadEvents();
  }, [filters]);

  return (
    <>
      <section className="grid-container">
        <div className="event-count">
          <h2>{"Events " + "(" + events.length + ")"}</h2>
        </div>

        {isLoading && <Loading text="Loading events..." />}

        {events.map((event) => (
          <EventCard
            key={event.id}
            // id={event.id}
            {...event}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </section>
      <aside>
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          onReset={resetFilters}
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
