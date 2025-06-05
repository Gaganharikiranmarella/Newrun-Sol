import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart({ cart, addToCart, user }) {
  const items = Object.values(cart || {});
  const navigate = useNavigate();
  const [isOrdering, setIsOrdering] = useState(false);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (isOrdering) return; // prevent multiple clicks
    setIsOrdering(true);
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
      // Optionally clear cart here or navigate away
    } catch (err) {
      alert("Error placing order.");
    } finally {
      setIsOrdering(false);
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
        <div key={item._id || item.name} className="cart-item">
          <h3>{item.name}</h3>
          <p>Price: ₹{item.price}</p>
          <div className="cart-controls">
            <button
              onClick={() => addToCart(item, Math.max(item.quantity - 1, 0))}
              disabled={item.quantity === 1} // disable at 1 to prevent zero or negative
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => addToCart(item, item.quantity + 1)}>+</button>
          </div>
          <p>Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
      <button onClick={placeOrder} disabled={isOrdering}>
        {isOrdering ? "Ordering..." : "Order"}
      </button>
    </div>
  );
}
