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
  keyWords,
}) {
  const isPosted = true;

  // Combine date + time into real JavaScript Date objects
  const startDateTime = new Date(`${startDate}T${startTime}`);
  const endDateTime = new Date(`${endDate}T${endTime}`);

  const orgID = orgId;
  const Organization = Parse.Object.extend("Organization");
  const orgObj = new Organization();
  orgObj.id = orgID;

  const rawTags = keyWords ?? [];
  const normalizedKeys = [
    ...new Set(
      rawTags
        .map((t) => String(t).trim())
        .filter(Boolean)
        .map((t) => t.toLowerCase())
    ),
  ];

  const EventTag = Parse.Object.extend("EventTag");

  const tagQuery = new Parse.Query(EventTag);
  tagQuery.containedIn("term", normalizedKeys);
  tagQuery.limit(1000);
  const existingTagObjects = await tagQuery.find();

  const existingKeys = new Set(existingTagObjects.map((o) => o.get("term")));

  const missingKeys = normalizedKeys.filter((k) => !existingKeys.has(k));

  const newTagObjects = missingKeys.map((key) => {
    const t = new EventTag();
    t.set("term", key);

    return t;
  });

  const savedNewTags =
    newTagObjects.length > 0 ? await Parse.Object.saveAll(newTagObjects) : [];

  const tagObjects = [...existingTagObjects, ...savedNewTags];

  const Event = Parse.Object.extend("Event");
  const newEvent = new Event();

  // Set all fields
  newEvent.set("isPosted", isPosted);
  newEvent.set("title", title);
  newEvent.set("description", description);
  newEvent.set("signupLink", signupLink);
  newEvent.set("orgID", orgObj);
  newEvent.set("eventPicID", thumbnailPicture);
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
