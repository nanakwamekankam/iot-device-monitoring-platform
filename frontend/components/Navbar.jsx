import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">●</span>
        <div>
          <h2>IoT Monitor</h2>
          <p>Device telemetry dashboard</p>
        </div>
      </div>

      <div className="navbar-links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/devices">Devices</NavLink>
        <NavLink to="/alerts">Alerts</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
