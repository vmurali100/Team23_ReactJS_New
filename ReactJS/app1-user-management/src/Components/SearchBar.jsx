import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/userSlice";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const dispatch = useDispatch();

  const timeoutRef = useRef(null); // Step 1

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  useEffect(() => {
    // Clear the previous timeout (if any)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedQuery(input);
    }, 1000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [input]);

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(setQuery(debouncedQuery)); // Dispatch the query to Redux store
    }
  }, [debouncedQuery, dispatch]);
  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search users..."
      />
    </div>
  );
};

export default SearchBar;
