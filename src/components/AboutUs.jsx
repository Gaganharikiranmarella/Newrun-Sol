import React, { useEffect, useState } from "react";
import "../App.css";

const API = "https://node-apps-gagan.vercel.app";

export default function AboutUs() {
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`${API}/name`)
      .then((res) => res.text())
      .then((data) => setName(data))
      .catch(() => setName("Developer"));
  }, []);

  const openOtherWorks = () => {
    window.location.href = "https://gaganharikiranmarella.github.io";
  };

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h1>About Us</h1>
          <p>
            {name} <br />
            I am Marella Gagan. I believe in writing clean and scalable code and
            constantly learning. This Website is made using MERN Stack, with the
            front end utilizing React.js and the back end using Node.js and
            Express.js. MongoDB is used for Database connectivity. The entire
            project is made live and working for global use. Further
            improvements coming soon!!
          </p>
        </div>

        <div className="about-image">
          <img src="public/images/aboutus.jpg" alt="About Us" />
        </div>
      </div>

      <button className="other-works-button" onClick={openOtherWorks}>
        Other Works
      </button>
    </div>
  );
}
