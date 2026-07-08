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
  // Refresh every 5 seconds
  const interval = setInterval(loadDevices, 5000);

  // Cleanup
  return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="page-header">
        <p className="eyebrow">Device fleet</p>
        <h1>Devices</h1>
        <p className="page-description">
          View registered IoT devices, current status, and deployment locations.
        </p>
      </div>

      <section className="card table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Device Name</th>
              <th>Status</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {devices.map((device) => (
              <tr key={device.id}>
                <td>{device.id}</td>
                <td className="table-strong">{device.name}</td>
                <td>
                  <span className={`status-badge status-${device.status}`}>
                    {device.status}
                  </span>
                </td>
                <td>{device.location}</td>
                <td>
                  <Link className="table-link" to={`/devices/${device.id}`}>
                    View details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {devices.length === 0 && (
          <p className="empty-state">No devices found.</p>
        )}
      </section>
    </div>
  );
}

export default Devices;
