import Parse from "parse";

export async function SaveEventToDB() {
  // Values sent if nothing from input is given
  //this probably overwrites
  //  ------DO NOT DELETE FOR TESTING PURPOSES -----
  const isPosted = true;
  const startTime = new Date("2025-12-22T19:30");
  const endTime = new Date("2025-12-22T19:30");
  const title = "sent_from_frontEnd";
  const description = "descriptionaroisblob";

  const orgID = "5z1KbHqPBC"; //is present in DB
  const Organization = Parse.Object.extend("Organization");
  const orgObj = new Organization();
  orgObj.id = orgID;

  const selectedTags = ["Fun", "Python"]; //are present in DB
  const EventTag = Parse.Object.extend("EventTag");
  const tagQuery = new Parse.Query(EventTag);
  tagQuery.containedIn("term", selectedTags); //points to tag based on value in "term" column
  const tagObjects = await tagQuery.find();

  // Hard-coded picture pointer for testing
  const Picture = Parse.Object.extend("Picture");
  const picObj = new Picture();
  picObj.id = "sQrZAOqBFz"; // is present in DB

  const Event = Parse.Object.extend("Event");
  const newEvent = new Event();

  // Set all non-relation fields
  newEvent.set("isPosted", isPosted);
  newEvent.set("startTime", startTime);
  newEvent.set("endTime", endTime);
  newEvent.set("title", title);
  newEvent.set("description", description);
  newEvent.set("orgID", orgObj);
  newEvent.set("signupLink", "https://erdetfredag.dk/");
  newEvent.set("eventPicID", picObj);

  // Handle EventTag relation
  const relation = newEvent.relation("eventTag");
  tagObjects.forEach((tagObj) => relation.add(tagObj)); //creates relation for each tag in list given to the tag in the EventTag table

  // Save event row to DB
  return await newEvent.save();
}
