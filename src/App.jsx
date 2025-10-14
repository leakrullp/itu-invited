import { useState } from "react";
import "./App.css";
import Button from "./components/Button/Button.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>This button does stuff</h2>

      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </Button>
      </div>

      <h3>Large buttons</h3>

      <div className="button-group">
        <Button>Click me</Button>
        <p>Primary button</p>
      </div>

      <div className="button-group">
        <Button variant="secondary">Click me</Button>
        <p>Secondary button</p>
      </div>

      <div className="button-group">
        <Button variant="tertiary">Click me</Button>
        <p>Tertiary button</p>
      </div>

      <div className="button-group">
        <Button icon="bookmark">Click me</Button>
        <p>Primary button + icon</p>
      </div>

      <div className="button-group">
        <Button variant="secondary" icon="bookmark">
          Click me
        </Button>
        <p>Secondary button + icon</p>
      </div>

      <div className="button-group">
        <Button variant="tertiary" icon="bookmark">
          Click me
        </Button>
        <p>Tertiary button + icon</p>
      </div>

      <h3>Small buttons</h3>

      <div className="button-group">
        <Button size="small">Click me</Button>
        <p>Primary button</p>
      </div>

      <div className="button-group">
        <Button size="small" variant="secondary">
          Click me
        </Button>
        <p>Secondary button</p>
      </div>

      <div className="button-group">
        <Button size="small" variant="tertiary">
          Click me
        </Button>
        <p>Tertiary button</p>
      </div>

      <div className="button-group">
        <Button size="small" icon="bookmark">
          Click me
        </Button>
        <p>Primary button + icon</p>
      </div>

      <div className="button-group">
        <Button size="small" variant="secondary" icon="bookmark">
          Click me
        </Button>
        <p>Secondary button + icon</p>
      </div>

      <div className="button-group">
        <Button size="small" variant="tertiary" icon="bookmark">
          Click me
        </Button>
        <p>Tertiary button + icon</p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
