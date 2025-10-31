# Input components

The file `Input.jsx` holds 6 different components. All six are defined as individual functions and exported from the same file:

```jsx
import {
  InputField,
  SelectField,
  DateField,
  TimeField,
  TextAreaField,
  TagInputField,
} from "../Input/Input";
```

All components share a base style via Input.css and follow a similar prop interface.

## InputField component

A standard single-line text input.
Supports optional icons to the left and/or right and inline validation messages.

| Prop                 | Type          | Default     | Description                            |
| -------------------- | ------------- | ----------- | -------------------------------------- |
| `label`              | `string`      | `undefined` | Label displayed above the input        |
| `placeholder`        | `string`      | `""`        | Placeholder text                       |
| `value`              | `string`      |             | Controlled value                       |
| `onChange`           | `(e) => void` |             | Change handler                         |
| `hasLeftIcon`        | `boolean`     | `false`     | Whether to render an icon on the left  |
| `leftIcon`           | `string`      |             | Material Symbol name for left icon     |
| `hasRightIcon`       | `boolean`     | `false`     | Whether to render an icon on the right |
| `rightIcon`          | `string`      |             | Material Symbol name for right icon    |
| `rightIconAriaLabel` | `string`      |             | Accessible label for right icon        |
| `disabled`           | `boolean`     | `false`     | Disables the input                     |
| `invalid`            | `boolean`     | `false`     | Displays error styling and helper text |

### Example of use

```jsx
<InputField
  label="Email"
  placeholder="you@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  hasLeftIcon
  leftIcon="mail"
  invalid={!emailValid}
/>
```

## SelectField component

A styled dropdown menu.
Supports both flat option arrays and grouped option structures via `<optgroup>`.

| Prop          | Type                                               | Default           | Description                                |
| ------------- | -------------------------------------------------- | ----------------- | ------------------------------------------ |
| `label`       | `string`                                           |                   | Label above the select                     |
| `placeholder` | `string`                                           | `"Select option"` | Placeholder shown as first disabled option |
| `options`     | `(string \| { label: string, items: string[] })[]` | `[]`              | Flat or grouped options                    |
| `value`       | `string`                                           |                   | Controlled selected value                  |
| `onChange`    | `(e) => void`                                      |                   | Change handler                             |
| `disabled`    | `boolean`                                          | `false`           | Disables the select                        |
| `invalid`     | `boolean`                                          | `false`           | Error styling and helper text              |

### Example of use (with grouped options)

```jsx
import clubs from "../../assets/Data/Clubs.js";

<SelectField
  label="Select club"
  placeholder="None selected"
  options={clubs}
  value={selectedClub}
  onChange={(e) => setSelectedClub(e.target.value)}
/>;
```

## DateField component

A custom-styled date input using the native HTML date picker while matching the design system.

| Prop          | Type          | Default | Description                                           |
| ------------- | ------------- | ------- | ----------------------------------------------------- |
| `label`       | `string`      |         | Label above the field                                 |
| `placeholder` | `string`      |         | Placeholder text (usually unused with native date UI) |
| `value`       | `string`      |         | Controlled value (ISO-formatted date)                 |
| `onChange`    | `(e) => void` |         | Change handler                                        |
| `disabled`    | `boolean`     | `false` | Disables input                                        |
| `invalid`     | `boolean`     | `false` | Error styling                                         |

### Example of use:

```jsx
<DateField
  label="Date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>
```

## TimeField component

A styled time input using the browser’s native time picker.

| Prop          | Type          | Default | Description              |
| ------------- | ------------- | ------- | ------------------------ |
| `label`       | `string`      |         | Label above the input    |
| `placeholder` | `string`      |         | Placeholder text         |
| `value`       | `string`      |         | Controlled value (HH:MM) |
| `onChange`    | `(e) => void` |         | Change handler           |
| `disabled`    | `boolean`     | `false` | Disables the field       |
| `invalid`     | `boolean`     | `false` | Error styling            |

### Example of usage:

```jsx
<TimeField
  label="Start time"
  value={startTime}
  onChange={(e) => setStartTime(e.target.value)}
/>
```

## TextAreaField component

A multiline text input for longer text content or notes.
Auto-resizes vertically and uses consistent error styling.

| Prop          | Type          | Default | Description                   |
| ------------- | ------------- | ------- | ----------------------------- |
| `label`       | `string`      |         | Label above textarea          |
| `placeholder` | `string`      | `""`    | Placeholder text              |
| `value`       | `string`      |         | Controlled value              |
| `onChange`    | `(e) => void` |         | Change handler                |
| `disabled`    | `boolean`     | `false` | Disables textarea             |
| `invalid`     | `boolean`     | `false` | Error styling and helper text |

### Example of usage

```jsx
<TextAreaField
  label="Additional notes"
  placeholder="Add details here..."
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
/>
```

## TagInputField component

A composite component for creating and managing editable tags.
Users can type text, press **Enter** to add a tag, click a tag to remove it, or press **Backspace** on an empty field to delete the last tag.

Used with the `TopicTag` component.

| Prop          | Type                              | Default                             | Description                          |
| ------------- | --------------------------------- | ----------------------------------- | ------------------------------------ |
| `label`       | `string`                          |                                     | Label above the input                |
| `placeholder` | `string`                          | `"Write something and press enter"` | Placeholder shown when no tags exist |
| `value`       | `string[]`                        | `[]`                                | Array of tag strings                 |
| `onChange`    | `(updatedTags: string[]) => void` |                                     | Called whenever tags change          |
| `disabled`    | `boolean`                         | `false`                             | Disables input                       |
| `invalid`     | `boolean`                         | `false`                             | Error styling                        |

### Exmple of usage

```jsx
const [keywords, setKeywords] = useState([]);

<TagInputField
  label="Enter topics"
  value={keywords}
  onChange={setKeywords}
  placeholder="Write something and press Enter"
/>;
```

**Behavior:**

- Press Enter → adds a new tag
- Press Backspace/Delete on empty input → removes last tag
- Click a tag → removes that tag
- Controlled via the value array

---

### Styling

All components share the same base styles defined in `Input.css`.
They support states for:

- `:focus` and `:focus-within`
- `.is-invalid` (error)
- `.is-disabled`
- `.has-left` / `.has-right` (icons)

Custom icons are from the Material Symbols Outlined set and adapt to theme colors.
