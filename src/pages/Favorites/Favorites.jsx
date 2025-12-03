import { useEffect, useState } from "react";
import Parse from "parse";

import { FilterSidebar, EventCard } from "../../components";
import "../../index.css";
import DetailPage from "../DetailPage/Detailpage";
import { getUserFavorites } from "./FavoriteService";

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
            const eventObj = favObj.get("eventID");

            // Fetch pointers (orgID, eventPicID)
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
};
