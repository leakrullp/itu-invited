import { FilterSidebar, EventCard } from "./components";
import { useEffect, useState } from "react";
import "./index.css";
import Parse from "parse";
import DetailPage from "./pages/DetailPage/Detailpage";

export default function FrontPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    async function loadEvents() {
      let formattedJSON = [];

      try {
        const Event = Parse.Object.extend("Event");
        const query = new Parse.Query(Event);

        //how we fetch the rows of the foreign keys
        query.ascending("startDate", "startTime");
        query.include("orgID");
        query.include("eventPicID");
        

        const results = await query.find();

        console.log(`Fetched ${results.length} events from Back4App`);

        formattedJSON = await Promise.all(
          results.map(async (eventObj) => {
            //pointers
            const org = eventObj.get("orgID");
            const pic = eventObj.get("eventPicID");

            //relation
            let tags = [];
            const tagRelation = eventObj.relation("eventTag");
            if (tagRelation) {
              tags = (await tagRelation.query().find()).map((tag) =>
                tag.get("term")
              );
            }

            return {
              id: eventObj.id,
              title: eventObj.get("title"),
              description: eventObj.get("description"),
              startTime: eventObj.get("startTime"),
              endTime: eventObj.get("endTime"),
              signupLink: eventObj.get("signupLink"),
              organisation: org?.get("orgName") ?? "unknown organisation",
              img:
                pic?.get("fileName")?.url() ??
                "src/assets/thumbnail-default.png",
              tags,
            };
          })
        );
      } catch (error) {
        console.error("Error loading events:", error);
      }
      setEvents(formattedJSON); //adds JSON data to useState([])
    }
    loadEvents();
  }, []); //dependency array is empty, but needs connection to FilterSidebar eventually

  return (
    <>
      <section className="grid-container">
        <div className="event-count">
          <h2>Events ({events.length})</h2>
        </div>

        {events.map((event) => (
          <EventCard
            key={event.id}
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
