import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Welcome from "./components/Welcome";

function App() {
  return (
    <div>
      <BrowserRouter>
        <header>
          <h1>Online Shopping Section</h1>
          <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/cart">Cart</Link> |{" "}
            <Link to="/login">Login</Link>
          </nav>
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
          &copy; Gagan Hari Kiran Marella, 2025. All rights reserved.
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
