import React from "react";
import { useSelector } from "react-redux";

const CartManagement = () => {
  const cartManagement = useSelector((state) => state.cartManagement);
  console.log(cartManagement)
  return <div>
    <h2>Welcome to Card management !!</h2>
  </div>;
};

export default CartManagement;
