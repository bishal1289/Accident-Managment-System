// src/LargeMap.js
import React from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App";

function LargeMap() {
  const { latitude, longitude } = useParams();
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

     

  return (
    <div className="large-map-container">
      <h1>Accident Location</h1>
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lon]}>
          <Popup>
            Accident location: {lat}, {lon}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LargeMap;
