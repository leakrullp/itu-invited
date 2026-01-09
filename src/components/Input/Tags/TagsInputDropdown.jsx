import { useState, useEffect } from "react";
import "../Input.css";
import Parse from "parse";
import { SelectField } from "../../index";

export default function TagsInputDropdown({ value = [], onChange }) {
  const [tagsList, setTagsList] = useState([]);

  useEffect(() => {
    const Tags = Parse.Object.extend("EventTag");
    const query = new Parse.Query(Tags);

    // fetch all terms and sort alphabetically
    query.find().then((TagsFromDB) => {
      const TagsRetrieved = TagsFromDB.map((rowFromDB) =>
        rowFromDB.get("term")
      ).sort((a, b) => a.localeCompare(b));
      setTagsList(TagsRetrieved);
    });
  }, []);

  return (
    <SelectField
      label="Select tags"
      placeholder="None selected"
      options={tagsList}
      value={value}
      onChange={onChange}
    />
  );
}
