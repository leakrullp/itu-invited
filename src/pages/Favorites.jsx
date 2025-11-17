import { useEffect, useState } from "react";
import { FilterSidebar, EventCard } from "../components";
import "../index.css"; /* temp-fix as Favorites.jsx doesn't have corresponding css */
import Parse from "parse"; // use your configured Parse instance

export const Favorites = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Define your Parse class and query
        const Event = Parse.Object.extend("Event");
        const query = new Parse.Query(Event);

        // Retrieve all Event objects
        const results = await query.find();

        console.log(`Fetched ${results.length} events from Back4App`);

        // Example: log just the first column, e.g., "title"
        results.forEach((event) => console.log(event.get("title")));

        // Convert Parse objects to plain JS for React rendering if needed
        const parsedEvents = results.map((event) => ({
          id: event.id,
          ...event.attributes,
        }));

        setEvents(parsedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <h2>Loading events...</h2>;

  // Optionally: filter only favorited events if that property exists in Parse
  const favoritedEvents = events.filter((event) => event.favorited);

  const cardsFavorited = favoritedEvents.map((card) => (
    <EventCard key={card.id} {...card} />
  ));

  return (
    <>
      <main className="container">{cardsFavorited}</main>
      <FilterSidebar />
    </>
  );
};
