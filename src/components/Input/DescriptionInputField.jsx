import "./Input.css";

export default function DescriptionInputField({ description, setDescription }) {
  return (
    <div className="description-container">
      <label className="description-field">
        <span>Description</span>
      </label>
      <textarea
        id="description"
        placeholder="Add your event description..."
        className="description-input"
        rows="4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
    </div>
  );
}
