import React from "react";
import "./App.css";  // assuming your global CSS is here

export default function AboutUs() {
  const openOtherWorks = () => {
    window.location.href = "/other-works.html"; // change path if needed
  };

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h1>About Us</h1>
          <p>
            We are passionate creators focused on delivering quality projects.
            Our team combines creativity and technical expertise to build
            innovative solutions that solve real-world problems. We believe in
            collaboration, continuous learning, and pushing the boundaries of
            what's possible.
          </p>
        </div>

        <div className="about-image">
          <img
            src="https://via.placeholder.com/400x300.png?text=About+Us+Image"
            alt="About Us"
          />
        </div>
      </div>

      <button className="other-works-button" onClick={openOtherWorks}>
        Other Works
      </button>
    </div>
  );
}
