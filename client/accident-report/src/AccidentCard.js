import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "./App.css";

function AccidentCard({ accident, onDelete }) {
  const [status, setStatus] = useState(
    accident.reported ? "Success" : "Pending"
  );
  const navigate = useNavigate();

  const handleReported = async () => {
    try {
      await axios.post(`http://localhost:5000/${accident._id}/report`);
      setStatus("Success");
    } catch (error) {
      console.error("There was an error reporting the accident!", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/accidents/${accident._id}`);
      onDelete(accident._id);
    } catch (error) {
      console.error("There was an error deleting the accident!", error);
    }
  };

  const handleCardClick = () => {
    navigate(`/map/${accident.latitude}/${accident.longitude}`);
  };

  return (
    <div
      className={`card ${status === "Success" ? "success" : ""}`}
      onClick={handleCardClick}
    >
      <div className="card-body">
        <h5 className="card-title">Accident Details</h5>
        <p className="card-text">Latitude: {accident.latitude}</p>
        <p className="card-text">Longitude: {accident.longitude}</p>
        <MapContainer
          center={[accident.latitude, accident.longitude]}
          zoom={13}
          style={{ height: "200px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[accident.latitude, accident.longitude]}>
            <Popup>
              Accident location: {accident.latitude}, {accident.longitude}
            </Popup>
          </Marker>
        </MapContainer>
        <button
          className={`btn ${
            status === "Success" ? "btn-success" : "btn-pending"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handleReported();
          }}
        >
          {status === "Success" ? "Success" : "Pending"}
        </button>
        {!accident.reported && (
          <button
            className="btn btn-reported"
            onClick={(e) => {
              e.stopPropagation();
              handleReported();
            }}
          >
            Reported
          </button>
        )}
        <button
          className="btn btn-delete"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AccidentCard;
