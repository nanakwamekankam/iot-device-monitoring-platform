// Stat card for real time monitoring
// returns: 
// Total Devices: 5
// Active Alerts: 2
// Telemetry Records: 120

function StatCard({ title, value, subtitle, icon, accent = "blue" }) {
  return (
    <div className={`stat-card stat-card-${accent}`}>
      <div className="stat-card-top">
        <div>
          <p className="stat-title">{title}</p>
          <h2 className="stat-value">{value}</h2>
        </div>
        {icon && <span className="stat-icon">{icon}</span>}
      </div>

      {subtitle && <p className="stat-subtitle">{subtitle}</p>}
    </div>
  );
}

export default StatCard;
