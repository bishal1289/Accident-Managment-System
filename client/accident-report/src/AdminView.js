import React, { useState, useEffect } from "react";
import axios from "axios";
import AccidentCard from "./AccidentCard";
import "./App.css";

function AdminView() {
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    async function fetchAccidents() {
      try {
        const response = await axios.get("http://localhost:5000/accidents");
        setAccidents(response.data);
      } catch (error) {
        console.error("Error fetching accident data", error);
      }
    }
    fetchAccidents();
  }, []);

  const handleDelete = (id) => {
    setAccidents(accidents.filter((accident) => accident._id !== id));
  };

  return (
    <div>
      <h1>Admin View</h1>
      <div className="accidents-container">
        {accidents.map((accident, index) => (
          <AccidentCard
            key={index}
            accident={accident}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminView;
