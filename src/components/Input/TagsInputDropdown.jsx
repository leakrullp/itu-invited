import { useState, useEffect } from "react";
import TopicTag from "../TopicTag/TopicTag.jsx";
import Button from "../../components/Button/Button.jsx";
import "./Input.css";
import Parse from "parse";
import initializeAllParse from "../../parseConfig.js";

export default function TagsInputDropdown() {
  const [tagsList, setTagsList] = useState([]);

  useEffect(() => {
    // Initialize Parse if needed
    initializeAllParse();

    // Define class and query to EventTag table
    const Tags = Parse.Object.extend("EventTag");
    const query = new Parse.Query(Tags);

    // Fetch all rows
    query.find().then((TagsFromDB) => {
      const TagsRetrieved = TagsFromDB.map((rowFromDB) =>
        rowFromDB.get("term")
      );
      setTagsList(TagsRetrieved);
    });
  }, []);

  return (
    <div className="title-container">
      <strong>TagsInputDropdown: </strong>
      {tagsList.join(", ")}
    </div>
  );
}
