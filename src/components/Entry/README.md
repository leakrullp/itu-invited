# Entry Component

This is a component hat renders a single event card with key event information:

- Event image
- Organization name
- Headline
- Date and time
- Topic tags
- Action buttons – e.g. bookmark or sign up link (if available)

All the props are **required** to have a value. In theory you are free to have empty string as `title` or an empty array as `tags`, but they just can't be null.

## Basic usage

The `Entry` component is designed to receive event data as props and display it consistently within your UI. You wouldn't actually hardcode the data like below

```jsx
import Entry from "./components/Entry/Entry";
import card1 from "./assets/card1.jpg";

const data = [
  {
    img: card1,
    organisation: "ITU Underground",
    headline: "Ethical Hacking Basics",
    date: "10/11/2025",
    time: "17:00 - 19:00",
    tags: ["Ethical hacking", "Python", "MFA"],
  },
];

export default function Example() {
  return (
    <Entry
      img={data[0].img}
      organisation={data[0].organisation}
      headline={data[0].headline}
      date={data[0].date}
      time={data[0].time}
      tags={data[0].tags}
    />
  );
}
```

This renders the following HTML output:

```html
<article class="Card">
  <img src="card1.jpg" alt="Ethical Hacking Basics" class="Image" />
  <div class="AllText">
    <h2 class="Organisation">ITU Underground</h2>
    <h2 class="Headline">Ethical Hacking Basics</h2>
    <div class="DateTime">
      <h2 class="Date">10/11/2025</h2>
      <h2 class="Time">17:00 - 19:00</h2>
    </div>
    <div class="Tags">
      <span class="TopicTag">Ethical hacking</span>
      <span class="TopicTag">Python</span>
      <span class="TopicTag">MFA</span>
    </div>
    <div class="bottom-btn-group">
      <button class="btn btn--tertiary btn--icon">
        <span class="material-symbols-outlined">bookmark</span>
      </button>
      <button class="btn btn--secondary btn--small">Go to sign up</button>
    </div>
  </div>
</article>
```

## Using the card dynamically to represent every element in a collection

You can easily map through `data` if you want to render multiple entries at once:

```jsx
import "./App.css";
import { Entry } from "./components";
import data from "./assets/Data/Data";

export default function App() {
  const cards = data.map((card) => <Entry key={card.img} {...card} />);

  return (
    <>
      <Navbar />
      <main className="container">{cards}</main>
    </>
  );
}
```

This way, all props are passed dynamically, and the component stays clean and scalable.
