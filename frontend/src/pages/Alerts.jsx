// Dashboard showing alerts generated from the different devices

import { useEffect, useState } from "react";
import { getAlerts } from "../api/alerts";

function formatDate(value) {
  if (!value) return "Unknown";
  const date = new Date(value);
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

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

  // Initial load
  loadAlerts();

  // Refresh every 5 seconds
  const interval = setInterval(loadAlerts, 5000);

  // Cleanup when component unmounts
  return () => clearInterval(interval);

}, []);

  return (
    <div>
      <div className="page-header">
        <p className="eyebrow">Alert center</p>
        <h1>Alerts</h1>
        <p className="page-description">
          Review threshold violations and device events generated from incoming telemetry.
        </p>
      </div>

      <section className="card table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Device</th>
              <th>Message</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id}>
                <td>{alert.id}</td>
                <td className="table-strong">
                  {alert.device_name || alert.device}
                </td>
                <td>{alert.message}</td>
                <td>
                  <span className={`severity-badge severity-${alert.severity}`}>
                    {alert.severity}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      alert.resolved
                        ? "status-badge status-online"
                        : "status-badge status-warning"
                    }
                  >
                    {alert.resolved ? "Resolved" : "Active"}
                  </span>
                </td>
                <td>{formatDate(alert.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {alerts.length === 0 && (
          <p className="empty-state">No alerts found.</p>
        )}
      </section>
    </div>
  );
}

export default Alerts;
