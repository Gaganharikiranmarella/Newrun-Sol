import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderHistory({ email }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const effectiveEmail = email || storedUser?.email;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!effectiveEmail) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`https://node-apps-gagan.vercel.app/api/orders/${email}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error loading orders:", err);
      }
    };

    fetchOrders();
  }, [effectiveEmail]);

  if (!effectiveEmail) return <p>Please login to view order history.</p>;
  if (orders.length === 0) return <p>No previous orders found.</p>;

  return (
    <div>
      <h2>Order History</h2>
      {orders.map((order, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Total:</strong> ₹{order.total}</p>
          <ul>
            {order.items.map((item, j) => (
              <li key={j}>{item.name} - ₹{item.price} x {item.qty}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
