import Parse from "parse";

export default async function getEvents(filters = {}) {
  const Event = Parse.Object.extend("Event");
  const query = new Parse.Query(Event);

  query.ascending("startDate", "startTime");
  query.include("orgID");
  query.include("eventPicID");

  // Filters to use when querying DB for events

  //posted events only
  if (filters.isPosted) {
    query.equalTo("isPosted", true);
  }

  //filter on start date greater than or equal to today
  if (filters.onlyFuture) {
    query.greaterThanOrEqualTo("startTime", new Date());
  }

  // filter on org with specific orgID
  if (filters.organisationId) {
    const Org = Parse.Object.extend("Organization");
    const orgPointer = Org.createWithoutData(filters.organisationId);
    query.equalTo("orgID", orgPointer);
  }

  if (filters.clubs?.length) {
    const Org = Parse.Object.extend("Organization");
    const orgQuery = new Parse.Query(Org);
    orgQuery.containedIn("orgName", filters.clubs);

    // Filter events where orgID matches the organizations returned by orgQuery
    query.matchesQuery("orgID", orgQuery);
  }

  //filter on events with specific tags
  if (filters.tags?.length) {
    const EventTag = Parse.Object.extend("EventTag");
    const tagQuery = new Parse.Query(EventTag);
    tagQuery.containedIn("term", filters.tags);

    // Relation query: eventTag relation contains at least one tag matching tagQuery
    query.matchesQuery("eventTag", tagQuery);
  }

  if (filters.ituDriven || filters.studentDriven) {
    const Org = Parse.Object.extend("Organization");
    const orgQueries = [];

    if (filters.ituDriven) {
      const q1 = new Parse.Query(Org);
      q1.equalTo("orgCategory", "ITU");
      orgQueries.push(q1);
    }

    if (filters.studentDriven) {
      const q2 = new Parse.Query(Org);
      q2.equalTo("orgCategory", "Student-driven");
      orgQueries.push(q2);
    }

    const combinedOrgQuery =
      orgQueries.length === 1 ? orgQueries[0] : Parse.Query.or(...orgQueries);

    query.matchesQuery("orgID", combinedOrgQuery);
  }

  const results = await query.find();

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
