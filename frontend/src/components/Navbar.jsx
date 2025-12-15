import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <Link style={linkStyle} to="/">Home</Link>
      <Link style={linkStyle} to="/login">Login</Link>
      <Link style={linkStyle} to="/register">Register</Link>
    </nav>
  );
}

const navStyle = {
  padding: "1rem 2rem",
  borderBottom: "2px solid black",
  backgroundColor: "white",
  display: "flex",
  gap: "1rem",
};

const linkStyle = {
  color: "black",
  textDecoration: "none",
  fontWeight: "bold",
};
