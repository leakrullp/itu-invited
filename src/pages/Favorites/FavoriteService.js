import Parse from "parse";

export const getUserFavorites = async () => {
  const UserFavorite = Parse.Object.extend("UserFavorite");
  const query = new Parse.Query(UserFavorite);

  query.equalTo("userID", Parse.User.current());
  query.include("eventID");

  return await query.find();
};

// Toggle favorite status
export async function toggleFavorite(eventId) {
  const currentUser = Parse.User.current();
  if (!currentUser) throw new Error("No current user");

  const UserFavorite = Parse.Object.extend("UserFavorite");
  const query = new Parse.Query(UserFavorite);

  // Check if this user already favorited this event
  query.equalTo("userID", currentUser);
  query.equalTo("eventID", {
    __type: "Pointer",
    className: "Event",
    objectId: eventId,
  });

  const existingFav = await query.first();

  if (existingFav) {
    // Already favorited → remove
    await existingFav.destroy();
    return false; // now not favorited
  } else {
    // Not favorited → create
    const newFav = new UserFavorite();
    newFav.set("userID", currentUser);

    const Event = Parse.Object.extend("Event");
    const eventObj = new Event();
    eventObj.id = eventId;
    newFav.set("eventID", eventObj);

    await newFav.save();
    return true; // now favorited
  }
}
