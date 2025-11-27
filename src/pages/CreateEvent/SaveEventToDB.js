import Parse from "parse";

export async function SaveEventToDB({
  title,
  description,
  startTime,
  endTime,
  startDate,
  endDate,
  selectedPicture,
}) {
  const isPosted = true;

  // Combine date + time into single value
  const startDateTime = new Date(`${startDate}T${startTime}`);
  const endDateTime = new Date(`${endDate}T${endTime}`);

  // to do - Org is still hard coded
  const orgID = "5z1KbHqPBC";
  const Organization = Parse.Object.extend("Organization");
  const orgObj = new Organization();
  orgObj.id = orgID;

  // to do - tags are still hard coded
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
  newEvent.set("signupLink", "https://erdetfredag.dk/");
  newEvent.set("orgID", orgObj);
  //newEvent.set("eventPicID", thumbnailPicture);
  newEvent.set("eventPicID", selectedPicture);

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
