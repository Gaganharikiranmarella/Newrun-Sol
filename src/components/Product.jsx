import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Product({ cart, addToCart }) {
  const API = "https://node-apps-gagan.vercel.app";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  // Get quantity from cart for each product
  const getQty = (productId) => (cart[productId] ? cart[productId].quantity : 0);

  return (
    <div className="product-container">
      <h1 className="product-title">Product List</h1>
      <div className="product-grid">
        {products.map((item) => (
          <div key={item._id} className="product-card">
            <h2>{item.name}</h2>
            <p>Price: ₹{item.price}</p>

            <div className="cart-controls">
              <button
                onClick={() => addToCart(item, getQty(item._id) - 1)}
                disabled={getQty(item._id) === 0}
              >
                -
              </button>
              <span>{getQty(item._id)}</span>
              <button onClick={() => addToCart(item, getQty(item._id) + 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
