import React from "react";

export default function Cart({ cart, addToCart }) {
  const items = Object.values(cart);

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart is Empty</h2>
        <p>Add some products from Home page.</p>
      </div>
    );
  }

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
    </div>
  );
}
