import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProcuctsAsyncAction } from "../redux/eCommerceCart";

const ECommerceCart = () => {
  const [product, serProduct] = useState({
    productName: "",
    productPrice: "",
  });

  const dispatch = useDispatch();

  const products = useSelector((state) => state.eCommerceCart);

  const [totalPrice, setTotalPrice] = useState();
  const handleAddProduct = () => {};
  const handleChange = () => {};
  const handleRemoveProduct = () => {};

  useEffect(() => {
    dispatch(getProcuctsAsyncAction());
  }, []);

  const { productName, productPrice } = product;
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">E-Commerce Cart</h1>

      {/* Add Product Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <div className="mb-4">
          <input
            type="text"
            value={productName}
            onChange={(e) => handleChange()}
            placeholder="Product Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            value={productPrice}
            onChange={(e) => handleChange()}
            placeholder="Product Price"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          onClick={handleAddProduct}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      {/* Cart Table */}
      <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 p-2">{product.id}</td>
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">${product.price}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="border border-gray-300 p-4 text-center"
              >
                No products in the cart.
              </td>
            </tr>
          )}
        </tbody>
      </table>

    
    </div>
  );
};

export default ECommerceCart;
