import Parse from "parse";

export default async function getEvents(filters = {}) {
  const Event = Parse.Object.extend("Event");
  const eventQuery = new Parse.Query(Event);

  const hasClubFilter = filters.clubs.length > 0;
  const categories = [];
  if (filters.ituDriven) categories.push("ITU");
  if (filters.studentDriven) categories.push("Student-driven");
  const hasCategoryFilter = categories.length > 0;

  eventQuery.ascending("startDate", "startTime");
  eventQuery.include("orgID");
  eventQuery.include("eventPicID");

  // Filters to use when querying DB for events

  //one function to manage how club and category checkboxes to co-exist
  if (hasCategoryFilter || hasClubFilter) {
    const Org = Parse.Object.extend("Organization");
    const orgQueries = [];

    if (hasCategoryFilter) {
      // Build OR across chosen categories, but each query also includes the club constraint (AND)
      for (const cat of categories) {
        const q = new Parse.Query(Org);
        q.equalTo("orgCategory", cat);
        if (hasClubFilter) q.containedIn("orgName", filters.clubs);
        orgQueries.push(q);
      }

      const finalOrgQuery =
        orgQueries.length === 1 ? orgQueries[0] : Parse.Query.or(...orgQueries);

      eventQuery.matchesQuery("orgID", finalOrgQuery);
    } else {
      // No category constraint, only clubs
      const q = new Parse.Query(Org);
      q.containedIn("orgName", filters.clubs);
      eventQuery.matchesQuery("orgID", q);
    }
  }

  //posted events only
  if (filters.isPosted) {
    eventQuery.equalTo("isPosted", true);
  }

  //filter on start date greater than or equal to today
  if (filters.onlyFuture) {
    eventQuery.greaterThanOrEqualTo("startTime", new Date());
  }

  // filter on org with specific orgID
  if (filters.organisationId) {
    const orgPointer = Org.createWithoutData(filters.organisationId);
    eventQuery.equalTo("orgID", orgPointer);
  }

  //filter on events with specific tags
  if (filters.tags?.length) {
    const EventTag = Parse.Object.extend("EventTag");
    const tagQuery = new Parse.Query(EventTag);
    tagQuery.containedIn("term", filters.tags);

    // Relation query: eventTag relation contains at least one tag matching tagQuery
    eventQuery.matchesQuery("eventTag", tagQuery);
  }

  const results = await eventQuery.find();

  return Promise.all(
    results.map(async (eventObj) => {
      const org = eventObj.get("orgID");
      const pic = eventObj.get("eventPicID");

      let tags = [];
      const tagRelation = eventObj.relation("eventTag");
      if (tagRelation) {
        tags = (await tagRelation.query().find()).map((t) => t.get("term"));
      }

      return {
        id: eventObj.id,
        title: eventObj.get("title"),
        description: eventObj.get("description"),
        startTime: eventObj.get("startTime"),
        endTime: eventObj.get("endTime"),
        isPosted: eventObj.get("isPosted"),
        signupLink: eventObj.get("signupLink"),
        organisation: org?.get("orgName") ?? "unknown organisation",
        img: pic?.get("fileName")?.url() ?? "src/assets/thumbnail-default.png",
        tags,
      };
    })
  );
}
