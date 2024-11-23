import { useState } from "react";
import ClickCounter from "./Components/ClickCounter";
import HoverCounter from "./Components/HoverCounter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>Welcome to HOC Topic !!!!</h2>

      <hr />
      <ClickCounter />
      <hr />

      <HoverCounter />
    </>
  );
}

export default App;
