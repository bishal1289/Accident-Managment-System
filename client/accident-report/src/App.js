import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes,Link } from "react-router-dom";
import AdminView from "./AdminView";
import LargeMap from "./LargeMap";
import "./App.css";

function App() {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/submit", location);
      alert("Accident reported successfully");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <Router>
      <Link to="/admin">Admin View</Link>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="emergency-form">
                <h1>Report an Accident</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Latitude:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={location.latitude}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Longitude:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={location.longitude}
                      readOnly
                    />
                  </div>
                  <button type="submit" className="btn-form">
                    Submit Accident
                  </button>
                </form>
              </div>
            </>
          }
        />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/map/:latitude/:longitude" element={<LargeMap />} />
      </Routes>
    </Router>
  );
}

export default App;
