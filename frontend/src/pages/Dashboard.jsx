// Dashboard page that shows summary numbers and a chart

import { useEffect, useState } from "react";
import { getDevices } from "../api/devices";
import { getTelemetry } from "../api/telemetry";
import { getAlerts } from "../api/alerts";
import StatCard from "../components/StatCard";
import TelemetryChart from "../components/TelemetryChart";

function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [telemetry, setTelemetry] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const devicesData = await getDevices();
        const telemetryData = await getTelemetry();
        const alertsData = await getAlerts();

        setDevices(devicesData);
        setTelemetry(telemetryData);
        setAlerts(alertsData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      }
    }

    loadDashboardData();
  }, []);

  const recentTelemetry = telemetry.slice(-10);

  return (
    <div>
      <h1>IoT Monitoring Dashboard</h1>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <StatCard title="Total Devices" value={devices.length} />
        <StatCard title="Telemetry Records" value={telemetry.length} />
        <StatCard title="Active Alerts" value={alerts.length} />
      </div>

      <TelemetryChart
        data={recentTelemetry}
        dataKey="temperature"
        title="Recent Temperature Readings"
      />
    </div>
  );
}

export default Dashboard;