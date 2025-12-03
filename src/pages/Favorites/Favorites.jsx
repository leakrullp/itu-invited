import { useEffect, useState } from "react";
import Parse from "parse";

import { FilterSidebar, EventCard } from "../../components";
import "../../index.css";
import DetailPage from "../DetailPage/Detailpage";
import { getUserFavorites } from "./favoriteService";

export const Favorites = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const favs = await getUserFavorites();

        // Map UserFavorite -> Event -> formattedJSON (same as FrontPage)
        const formattedJSON = await Promise.all(
          favs.map(async (favObj) => {
            const eventID = favObj.get("eventID").id;

            // STEP 2: re-fetch event with includes (IMPORTANT!!)
            const Event = Parse.Object.extend("Event");
            const query = new Parse.Query(Event);

            query.equalTo("objectId", eventID);
            query.include("orgID");
            query.include("eventPicID");

            const eventObj = await query.first();

            // STEP 3: pointers now properly loaded
            const org = eventObj.get("orgID");
            const pic = eventObj.get("eventPicID");
            // Fetch relation tags
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

        setEvents(formattedJSON);
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    }

    loadFavorites();
  }, []);

  return (
    <>
      <section className="grid-container">
        <div className="event-count">
          <h2>Favorites ({events.length})</h2>
        </div>

        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            {...event}
            onClick={() => setSelectedEvent(event)}
            onRemove={(id) =>
              setEvents((prev) => prev.filter((e) => e.id !== id))
            }
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
};
