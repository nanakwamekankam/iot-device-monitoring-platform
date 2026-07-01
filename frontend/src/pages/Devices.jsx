// Device monitoring page for inventory view
// this dashboard houses all devices and shows their states, readings, locations etc.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDevices } from "../api/devices";

function Devices() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    async function loadDevices() {
      try {
        const data = await getDevices();
        setDevices(data);
      } catch (error) {
        console.error("Failed to load devices:", error);
      }
    }

    loadDevices();
  }, []);

  return (
    <div>
      <h1>Devices</h1>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Device Name</th>
            <th>Status</th>
            <th>Location</th>
            <th>Detail</th>
          </tr>
        </thead>

        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.id}</td>
              <td>{device.name}</td>
              <td>{device.status}</td>
              <td>{device.location}</td>
              <td>
                <Link to={`/devices/${device.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Devices;