import Parse from "parse";

export default async function getEvents(filters = {}) {
  const Event = Parse.Object.extend("Event");
  const query = new Parse.Query(Event);

  query.ascending("startDate", "startTime");
  query.include("orgID");
  query.include("eventPicID");

  // Filters to use when querying DB for events

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

  //filter on events with specific tags
  if (filters.tags?.length) {
    query.containedIn("eventTag", filters.tags);
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
        signupLink: eventObj.get("signupLink"),
        organisation: org?.get("orgName") ?? "unknown organisation",
        img: pic?.get("fileName")?.url() ?? "src/assets/thumbnail-default.png",
        tags,
      };
    })
  );
}
