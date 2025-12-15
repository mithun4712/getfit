import { useState } from "react";
import Navbar from "../components/Navbar";

export default function CalorieCalculator() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [calories, setCalories] = useState(null);

  const calculateCalories = () => {
    if (!age || !weight || !height) {
      alert("Please fill all fields");
      return;
    }

    const bmr =
      10 * weight +
      6.25 * height -
      5 * age +
      5;

    setCalories(Math.round(bmr));
  };

  return (
    <>
      <Navbar />

      <div style={pageStyle}>
        <div style={cardStyle}>
          <h1>Calorie Calculator</h1>

          <input
            type="number"
            placeholder="Age (years)"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={inputStyle}
          />

          <button onClick={calculateCalories} style={buttonStyle}>
            Calculate Calories
          </button>

          {calories && (
            <p style={resultStyle}>
              Your daily calories: <b>{calories} kcal</b>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

/* STYLES */
const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  backgroundColor: "#f9f9f9",
  padding: "2.5rem",
  borderRadius: "12px",
  width: "350px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  fontSize: "1rem",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
};

const resultStyle = {
  marginTop: "1rem",
  fontSize: "1.1rem",
};
