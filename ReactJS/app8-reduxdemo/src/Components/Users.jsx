import React from "react";
import { useSelector } from "react-redux";

const Users = () => {
  const users = useSelector((state) => state.users);
  console.log(users);
  return (
    <div>
      <h2>Welcome to Users</h2>
      <ul>
        {users.map((user) => {
          return <li>{user}</li>;
        })}
      </ul>
    </div>
  );
};

export default Users;
