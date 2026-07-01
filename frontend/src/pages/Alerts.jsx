// Dashboard showing alerts generated from the different devices

import { useEffect, useState } from "react";
import { getAlerts } from "../api/alerts";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function loadAlerts() {
      try {
        const data = await getAlerts();
        setAlerts(data);
      } catch (error) {
        console.error("Failed to load alerts:", error);
      }
    }

    loadAlerts();
  }, []);

  return (
    <div>
      <h1>Alerts</h1>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Device</th>
            <th>Message</th>
            <th>Severity</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td>{alert.id}</td>
              <td>{alert.device}</td>
              <td>{alert.message}</td>
              <td>{alert.severity}</td>
              <td>{alert.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Alerts;