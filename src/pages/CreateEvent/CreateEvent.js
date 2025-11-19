import Parse from "parse";

export async function CreateEvent(eventData) {
  const Event = Parse.Object.extend("Event");
  const newEvent = new Event();

  Object.entries(eventData).forEach(([key, value]) => {
    newEvent.set(key, value);
  });

  return await newEvent.save();
}
