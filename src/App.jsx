import { useState } from "react";
import reactLogo from "./assets/logo.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Welcome from "./components/Welcome"; // Optional: in case direct routing needed
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <header>
          <h1>Online Shopping Section</h1>
          <Link to="/">Home</Link> -
          <Link to="/cart">Cart</Link> -
          <Link to="/login">Login</Link>
          <hr />
        </header>

        <main>
          <Routes>
            <Route index element={<Product />} />
            <Route path="/" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/welcome" element={<Welcome username="User" />} />
          </Routes>
        </main>

        <footer>
          <hr />
          &copy;Gagan Hari Kiran Marella; 2025. All rights Reserved.
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
