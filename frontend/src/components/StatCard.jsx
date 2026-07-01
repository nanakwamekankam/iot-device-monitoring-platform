// Stat card for real time monitoring
// returns: 
// Total Devices: 5
// Active Alerts: 2
// Telemetry Records: 120

function StatCard({ title, value }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "16px",
      borderRadius: "8px",
      minWidth: "160px"
    }}>
      <h3>{title}</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

export default StatCard;