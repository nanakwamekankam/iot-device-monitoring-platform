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
      console.error(error);
    }
  }

  // Initial load
  loadDashboardData();

  // Refresh every 5 seconds
  const interval = setInterval(loadDashboardData, 5000);

  // Cleanup
  return () => clearInterval(interval);

}, []);

  const recentTelemetry = telemetry.slice(-10);

  return (
  <div>
    <div className="page-header">
      <p className="eyebrow">Live IoT telemetry</p>
      <h1>IoT Monitoring Dashboard</h1>
      <p className="page-description">
        Monitor connected devices, telemetry volume, and active alerts from one dashboard.
      </p>
    </div>

    <section className="stats-grid">
	<StatCard
  	title="Total Devices"
  	value={devices.length}
 	subtitle="Registered edge devices"
  	icon="📡"
  	accent="blue"/>

	<StatCard
  	title="Telemetry Records"
  	value={telemetry.length}
  	subtitle="Readings received"
  	icon="📈"
  	accent="green"/>

	<StatCard
  	title="Active Alerts"
  	value={alerts.length}
  	subtitle="Unresolved warnings"
  	icon="⚠️"
  	accent="orange"/>
    </section>

    <section className="card chart-card">
      <TelemetryChart
        data={recentTelemetry}
        dataKey="temperature"
        title="Recent Temperature Readings"
      />
    </section>
  </div>
);
}

export default Dashboard;
