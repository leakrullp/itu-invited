import { useState, useEffect } from "react";
import "./Input.css";
import Parse from "parse";
import initializeAllParse from "../../parseConfig.js";
import SelectField from "./SelectField.jsx";

export default function TagsInputDropdown() {
  // To retrieve and show tags from the database
  const [tagsList, setTagsList] = useState([]);

  // To store what the user selects from the dropdown
  const [selectedTags, setSelectedTags] = useState([]);

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
      <SelectField //create SelectionField for tags allowing for multiselection
        label="Select Tags"
        placeholder="None selected"
        options={tagsList}
        value={selectedTags}
        onChange={setSelectedTags}
        multiple={true}
      />
    </div>
  );
}
