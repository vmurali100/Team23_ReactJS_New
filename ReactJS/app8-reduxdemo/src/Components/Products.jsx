import React from "react";
import { useSelector } from "react-redux";

const Products = () => {
  const products = useSelector((state) => state.products);

  return (
    <div>
      <h2>Welcome to Products </h2>
      <ul>
        {products.map((product)=>{
            return <li>{product}</li>
        })}
      </ul>
    </div>
  );
};

export default Products;
