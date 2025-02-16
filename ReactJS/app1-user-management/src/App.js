import logo from "./logo.svg";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import UserList from "./Components/UserList";
import CompA from "./Components/CompA";
import CompB from "./Components/CompB";
import { useCallback, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  // Memoizing the increment function using useCallback
  const handleIncrement = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []); // Empty dependency array, so this function will be created once

  return (
    <div>
      <h1>User List</h1>
      <SearchBar />
      <UserList />
      
      {/* <button
        onClick={handleIncrement} // Using the memoized function
      >
        Increment Count
      </button>
      <CompA count={count} />
      <hr />
      <CompB handleIncrement={handleIncrement} /> Passing down to CompB */}
    </div>
  );
}

export default App;
