import Parse from "parse";

export async function deleteEvent(eventId) {
  const Event = Parse.Object.extend("Event"); //Initiate an event object that connects in Parse
  const Favorite = Parse.Object.extend("UserFavorite"); //Initiate a favorite object that connects in Parse

  const eventPointer = Event.createWithoutData(eventId); //get event pointer

  const favQuery = new Parse.Query(Favorite); //delete favorites that points to the event
  favQuery.equalTo("eventID", eventPointer);

  const favorites = await favQuery.find();

  if (favorites.length > 0) {
    await Parse.Object.destroyAll(favorites);
  }

  await eventPointer.destroy(); //delete the event itself from the event df
}
