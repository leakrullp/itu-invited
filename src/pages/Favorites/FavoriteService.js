import Parse from "parse";
export const getUserFavorites = async () => {
    const UserFavorite = Parse.Object.extend("UserFavorite");
    const query = new Parse.Query(UserFavorite);
  
    query.equalTo("userID", Parse.User.current());
    query.include("eventID");
    
    return await query.find();
  };

export const toggleFavorite = async (event) => {
    const UserFavorite = Parse.Object.extend("UserFavorite");
    const query = new Parse.Query(UserFavorite);
  
    query.equalTo("userID", Parse.User.current());
    query.equalTo("eventID", event);
  
    const exists = await query.first();
  
    if (exists) {
      await exists.destroy();
      return false;
    }
  
    const fav = new UserFavorite();
    fav.set("userID", Parse.User.current());
    fav.set("eventID", event);
    await fav.save();
    return true;
  };