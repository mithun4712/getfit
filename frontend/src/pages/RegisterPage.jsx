import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    alert("Registration functionality will be added later");
  };

  return (
    <>
      <Navbar />

      <div style={containerStyle}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleRegister} style={buttonStyle}>
          Register
        </button>
      </div>
    </>
  );
}

/* ===== STYLES ===== */

const containerStyle = {
  maxWidth: "350px",
  margin: "3rem auto",
  padding: "2rem",
  border: "1px solid #ddd",
  borderRadius: "8px",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "0.8rem",
  marginBottom: "1rem",
  borderRadius: "5px",
  border: "2px solid black",
  color: "black",
};

const buttonStyle = {
  width: "100%",
  padding: "0.8rem",
  backgroundColor: "white",
  border: "2px solid black",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer",
};

