import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart({ cart, addToCart, user }) {
  const items = Object.values(cart);
  const navigate = useNavigate();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const formattedItems = items.map(({ name, price, quantity }) => ({
        name,
        price,
        qty: quantity,
      }));

      await axios.post("https://node-apps-gagan.vercel.app/api/orders", {
        email: user.email,
        items: formattedItems,
        total: totalPrice,
      });

      alert("Order successful, Thank you!");
    } catch (err) {
      alert("Error placing order.");
    }
  };

  if (!user) {
    return (
      <div className="cart-container">
        <h2>Please Login</h2>
        <button onClick={() => navigate("/login")}>Login to proceed with order</button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart is Empty</h2>
        <p>Add some products from Home page.</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {items.map((item) => (
        <div key={item._id} className="cart-item">
          <h3>{item.name}</h3>
          <p>Price: ₹{item.price}</p>
          <div className="cart-controls">
            <button
              onClick={() => addToCart(item, item.quantity - 1)}
              disabled={item.quantity === 0}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => addToCart(item, item.quantity + 1)}>+</button>
          </div>
          <p>Total: ₹{item.price * item.quantity}</p>
        </div>
      ))}
      <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
      <button onClick={placeOrder}>Order</button>
    </div>
  );
}
