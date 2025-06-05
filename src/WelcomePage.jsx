import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WelcomePage.css";
import { useNavigate } from "react-router-dom";

const API = "https://node-apps-gagan.vercel.app";

export default function WelcomePage() {
  const [greet, setGreet] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);  // to track errors
  const navigate = useNavigate();

  useEffect(() => {
    // Use async function inside useEffect for cleaner async calls
    const fetchData = async () => {
      try {
        const greetRes = await axios.get(`${API}/greet`);
        setGreet(greetRes.data);

        const nameRes = await axios.get(`${API}/name`);
        setName(nameRes.data);

      } catch (err) {
        setError("Error loading data");
        setGreet("");
        setName("");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="welcome-container error">{error}</div>;
  }

  return (
    <div className="welcome-container">
      <h1 className="greet">{greet}</h1>
      <h2 className="name">{name}</h2>
      <button className="go-button" onClick={() => navigate("/")}>
        Go to Website
      </button>
    </div>
  );
}
