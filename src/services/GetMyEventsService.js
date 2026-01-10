import Parse from "parse";

export default async function getMyEvents(filters = {}) {
  const Event = Parse.Object.extend("Event");
  const eventQuery = new Parse.Query(Event);
  const Org = Parse.Object.extend("Organization");

  eventQuery.ascending("startDate", "startTime");
  eventQuery.include("orgID");
  eventQuery.include("eventPicID");

  // filter on org with specific orgID
  if (filters.organisationId) {
    const orgPointer = Org.createWithoutData(filters.organisationId);
    eventQuery.equalTo("orgID", orgPointer);
  }

  const results = await eventQuery.find();

  return Promise.all(
    results.map(async (eventObj) => {
      const org = eventObj.get("orgID");
      const pic = eventObj.get("eventPicID");

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
      };
    })
  );
}
