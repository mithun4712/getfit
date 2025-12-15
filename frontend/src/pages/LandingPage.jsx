import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div style={heroStyle}>
        {/* Background fitness shadows */}
        <div style={circleOne}></div>
        <div style={circleTwo}></div>

        <div style={heroContent}>
          <h1 style={heroTitle}>Achieve Your Fitness Goals</h1>
          <p style={heroSubtitle}>
            Track calories, workouts, and food logs in one powerful fitness platform.
          </p>

          {/* BLUE BUTTON */}
          <Link to="/register" style={getStartedButton}>
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div style={featuresContainer}>
        <FeatureCard title="Calorie Calculator" link="/calorie-calculator" />
        <FeatureCard title="Food Log" link="/food-log" />
        <FeatureCard title="Workout Log" link="/workout-log" />
      </div>

      {/* AI Section */}
      <div style={aiSection}>
        <h2 style={sectionTitle}>AI Powered Features</h2>
        <div style={featuresContainer}>
          <FeatureCard title="Dashboard" link="/dashboard" />
          <FeatureCard title="AI Suggestions" link="/ai-suggestions" />
          <FeatureCard title="AI Generated Workouts" link="/ai-workouts" />
        </div>
      </div>
    </>
  );
}

/* ================= FEATURE CARD ================= */
function FeatureCard({ title, link }) {
  const [hover, setHover] = useState(false);

  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <div
        style={{
          ...cardStyle,
          transform: hover ? "translateY(-8px)" : "translateY(0)",
          boxShadow: hover
            ? "0 15px 30px rgba(0,0,0,0.2)"
            : "0 6px 15px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h3 style={cardTitle}>{title}</h3>
        <p style={cardText}>Click to explore</p>
      </div>
    </Link>
  );
}

/* ================= STYLES ================= */

const heroStyle = {
  position: "relative",
  padding: "6rem 5rem",
  backgroundColor: "#ffffff",
  overflow: "hidden",
};

const heroContent = {
  maxWidth: "600px",
  position: "relative",
  zIndex: 2,
};

const heroTitle = {
  fontSize: "3.2rem",
  fontWeight: "bold",
  color: "#111",
  marginBottom: "1rem",
};

const heroSubtitle = {
  fontSize: "1.2rem",
  color: "#555",
  marginBottom: "2rem",
};

const getStartedButton = {
  backgroundColor: "#007bff",
  color: "white",
  padding: "14px 32px",
  fontSize: "1.1rem",
  fontWeight: "bold",
  borderRadius: "8px",
  textDecoration: "none",
  boxShadow: "0 10px 25px rgba(0,123,255,0.4)",
};

/* FITNESS BACKGROUND SHADOWS */
const circleOne = {
  position: "absolute",
  width: "300px",
  height: "300px",
  background: "rgba(0,123,255,0.08)",
  borderRadius: "50%",
  top: "-80px",
  right: "-80px",
};

const circleTwo = {
  position: "absolute",
  width: "220px",
  height: "220px",
  background: "rgba(0,123,255,0.05)",
  borderRadius: "50%",
  bottom: "-60px",
  left: "-60px",
};

const featuresContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
  padding: "3rem 2rem",
  flexWrap: "wrap",
  backgroundColor: "#f5f5f5",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "2rem",
  width: "250px",
  textAlign: "center",
  color: "#111",
  transition: "all 0.3s ease",
};

const cardTitle = {
  fontSize: "1.4rem",
  fontWeight: "bold",
};

const cardText = {
  marginTop: "0.5rem",
  color: "#666",
};

const aiSection = {
  backgroundColor: "#ffffff",
  padding: "3rem 2rem",
};

const sectionTitle = {
  textAlign: "center",
  fontSize: "2rem",
  marginBottom: "2rem",
  fontWeight: "bold",
};
