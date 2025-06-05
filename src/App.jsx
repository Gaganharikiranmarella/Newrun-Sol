import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import AboutUs from "./components/AboutUs";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState({}); // { productId: { ...product, quantity } }

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

    // Optionally: You can call backend API here to sync cart live
  };

  return (
    <div>
      <BrowserRouter>
        <header>
          <h1>Online Shopping Section</h1>
          <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/cart">Cart</Link> |{" "}
            <Link to="/login">Login</Link> |{" "}
            <Link to="/about">About Us</Link>
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
            <Route path="/cart" element={<Cart cart={cart} addToCart={addToCart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/welcome" element={<Welcome username="User" />} />
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
