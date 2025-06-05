import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import AboutUs from "./components/AboutUs";
import OrderHistory from "./components/OrderHistory";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({});
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (user) {
      axios
        .get(`https://node-apps-gagan.vercel.app/cart/${user._id}`)
        .then((res) => {
          const items = res.data.items || [];
          const cartObj = {};
          items.forEach((item) => {
            cartObj[item.productId] = item;
          });
          setCart(cartObj);
        })
        .catch(() => setCart({}));
    } else {
      setCart({});
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const itemsArray = Object.values(cart);
    axios
      .post("https://node-apps-gagan.vercel.app/cart", {
        userId: user._id,
        items: itemsArray,
      })
      .catch((e) => console.error("Failed to sync cart:", e));
  }, [cart, user]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (quantity <= 0) {
        delete updatedCart[product._id];
      } else {
        updatedCart[product._id] = { ...product, quantity };
      }
      return updatedCart;
    });
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCart({});
  };

  const handleOrder = () => {
    const items = Object.values(cart).map(({ name, price, quantity }) => ({
      name,
      price,
      qty: quantity,
    }));
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    axios
      .post("https://node-apps-gagan.vercel.app/orders", {
        email: user.email,
        items,
        total,
      })
      .then(() => {
        alert("Order successful, Thank you!");
        setCart({});
        axios.post("https://node-apps-gagan.vercel.app/cart", {
          userId: user._id,
          items: [],
        });
      })
      .catch((e) => console.error("Order failed:", e));
  };

  if (showLogin) {
    return (
      <Login
        onLogin={handleLogin}
        backToCartAvailable={true}
        onBackToCart={() => setShowLogin(false)}
      />
    );
  }

  return (
    <div>
      <BrowserRouter>
        <header>
          <h1>Online Shopping Section</h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/cart">Cart</Link> |{" "}
            {user ? (
              <>
                <span>Hi, {user.username}</span>{" "}
                <button onClick={handleLogout}>Logout</button> |{" "}
                <Link to="/orders">Order History</Link>
              </>
            ) : (
              <button
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  padding: 0,
                  color: "blue",
                  textDecoration: "underline",
                }}
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
            )}{" "}
            | <Link to="/about">About Us</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route
              index
              element={<Product cart={cart} addToCart={addToCart} />}
            />
            <Route
              path="/"
              element={<Product cart={cart} addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} addToCart={addToCart} user={user} />}
            />

            <Route
              path="/login"
              element={
                <Login onLogin={handleLogin} backToCartAvailable={false} />
              }
            />
            <Route
              path="/welcome"
              element={<Welcome username={user?.username || "User"} />}
            />
            <Route
              path="/orders"
              element={<OrderHistory email={user?.email || ""} />}
            />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>

        <footer>
          <hr />
          &copy; Gagan Hari Kiran Marella, 2025. All rights reserved.
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
