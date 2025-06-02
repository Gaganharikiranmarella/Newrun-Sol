import React, { useEffect, useState } from "react";
import axios from "axios";
//import "./Product.css";

export default function Product() {
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

  return (
    <div className="product-container">
      <h1 className="product-title">Product List</h1>
      <div className="product-grid">
        {products.map((item, index) => (
          <div key={index} className="product-card">
            <h2>{item.name}</h2>
            <p>Price: ₹{item.price}</p>
            <p>Quantity: {item.qty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
