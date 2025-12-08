import Parse from "parse";

export async function SaveEventToDB({
  orgId,
  title,
  description,
  startTime,
  endTime,
  startDate,
  endDate,
  thumbnailPicture,
  signupLink,
  tags,
}) {
  const isPosted = true;

  // Combine date + time into real JavaScript Date objects
  const startDateTime = new Date(`${startDate}T${startTime}`);
  const endDateTime = new Date(`${endDate}T${endTime}`);

  const orgID = orgId;
  const Organization = Parse.Object.extend("Organization");
  const orgObj = new Organization();
  orgObj.id = orgID;

  const selectedTags = ["Fun", "Python"];
  const EventTag = Parse.Object.extend("EventTag");
  const tagQuery = new Parse.Query(EventTag);
  tagQuery.containedIn("term", selectedTags);
  const tagObjects = await tagQuery.find();

  //const Picture = Parse.Object.extend("Picture");
  //const picObj = new Picture();
  //picObj.id = "sQrZAOqBFz";

  const Event = Parse.Object.extend("Event");
  const newEvent = new Event();

  // Set simple fields
  newEvent.set("isPosted", isPosted);
  newEvent.set("title", title);
  newEvent.set("description", description);
  newEvent.set("signupLink", signupLink);
  newEvent.set("orgID", orgObj);
  newEvent.set("eventPicID", thumbnailPicture);

  // Set correct dates
  newEvent.set("startTime", startDateTime);
  newEvent.set("endTime", endDateTime);
  newEvent.set("startDate", startDate);
  newEvent.set("endDate", endDate);

  // Add tags relation
  const relation = newEvent.relation("eventTag");
  tagObjects.forEach((tagObj) => relation.add(tagObj));

  // Save event row to DB
  return await newEvent.save();
}
