import Parse from "parse";
export const getUserFavorites = async () => {
    const UserFavorite = Parse.Object.extend("UserFavorite");
    const query = new Parse.Query(UserFavorite);
  
    query.equalTo("userID", Parse.User.current());
    query.include("eventID");
    
    return await query.find();
  };