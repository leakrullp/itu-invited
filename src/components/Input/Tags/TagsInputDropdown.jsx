import { useState, useEffect } from "react";
import "../Input.css";
import Parse from "parse";
import { SelectField } from "../../index";

export default function TagsInputDropdown() {
  // To retrieve and show tags from the database
  const [tagsList, setTagsList] = useState([]);

  // To store what the user selects from the dropdown
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    // Initialize Parse if needed

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
    <SelectField
      label="Select tags"
      placeholder="None selected"
      options={tagsList}
      value={selectedTags}
      onChange={setSelectedTags}
      multiple={true}
    />
  );
}
