import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setQuery } from '../redux/userSlice';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const timeoutRef = useRef(null); // Step 1

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value); 

    // Clear the previous timeout (if any)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(setQuery(value)); // Dispatch the query to Redux store
    }, 1000); 

  };

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
