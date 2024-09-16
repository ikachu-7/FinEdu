import { useEffect, useState } from "react";
import L from "leaflet";
import axios from "axios";
import Navbar from "../../components/Navbar";
import ShikshaBot from "../../components/ShikshaBot/ShikshaBot";

import "leaflet/dist/leaflet.css";

const MapBank = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [banks, setBanks] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          setLatitude(lat);
          setLongitude(lon);

          // Create a map centered around the user's location
          const mapInstance = L.map("map").setView([lat, lon], 13);
          setMap(mapInstance);

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(mapInstance);

          // Add a marker at the user's location
          L.marker([lat, lon])
            .addTo(mapInstance)
            .bindPopup("Your Location")
            .openPopup();

          // Fetch nearby banks
          try {
            const response = await axios.get(
              `https://overpass-api.de/api/interpreter?data=[out:json];(node(around:5000,${lat},${lon})[amenity=bank];);out;`
            );

            const bankData = response.data.elements;

            // Update the banks state with fetched data
            setBanks(bankData);

            // Add markers for each bank on the map
            bankData.forEach((bank) => {
              L.marker([bank.lat, bank.lon])
                .addTo(mapInstance)
                .bindPopup(bank.tags.name || "Bank");
            });
          } catch (error) {
            console.error("Error fetching nearby banks:", error);
          }
        },
        function (error) {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="py-[100px] flex flex-col items-center">
        <h2>Your Location Coordinates:</h2>
        {latitude !== null && longitude !== null ? (
          <div>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div id="map" style={{ width: "100%", height: "500px" }}></div>
      </div>
      <ShikshaBot />
    </>
  );
};

export default MapBank;
