export default function WorkoutLog() {
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1>Workout Log</h1>
        <p>Track your workouts here.</p>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  backgroundColor: "#f9f9f9",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
};
