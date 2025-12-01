import React from "react";

export default function App() {
  const [myFavoriteThings, setMyFavoriteThings] = useState([]);

  return (
    <div>
      {myFavoriteThings.length > 0 ? (
        <h1>You have {myFavoriteThings.length} events saved!</h1>
      ) : (
        <p>You have no events saved</p>
      )}
    </div>
  );
}
