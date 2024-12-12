import { useState } from "react";

import "./App.css";

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const calculateBMI = () => {
    const isValidHeight = /^\d+$/.test(height);
    const isValidWeight = /^\d+$/.test(weight);

    if (isValidHeight && isValidWeight) {
      const heightInMeters = parseFloat(height) / 100;
      const weightInKg = parseFloat(weight);
      const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmi);

      if (bmi < 18.5) {
        setStatus("Underweight");
      } else if (bmi >= 18.5 && bmi < 24.9) {
        setStatus("Healthy");
      } else if (bmi >= 25 && bmi < 29.9) {
        setStatus("Overweight");
      } else {
        setStatus("Obese");
      }

      setError("");
    } else {
      setBmi(null);
      setStatus("");
      setError("Please enter valid numeric values for height and weight.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="box"></div>
        <div className="data">
          <h1>BMI Calculator</h1>

          {error && <p className="error">{error}</p>}
          <div className="input-container">
            <label htmlFor="height">Height (cm):</label>
            <input
              type="text"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            ></input>
          </div>
          <div className="input-container">
            <label htmlFor="weight">Weight (kg):</label>
            <input
              type="text"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            ></input>
          </div>
          <button onClick={calculateBMI}>Calculate BMI</button>
          {bmi !== null && (
            <div className="result">
              <p>Your BMI is: {bmi}</p>
              <p>Status: {status}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
