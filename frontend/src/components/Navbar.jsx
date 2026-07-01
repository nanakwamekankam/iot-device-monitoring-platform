// Navigation Protocol to change pages without reloading the browser(using Link)

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ marginRight: "16px" }}>Dashboard</Link>
      <Link to="/devices" style={{ marginRight: "16px" }}>Devices</Link>
      <Link to="/alerts">Alerts</Link>
    </nav>
  );
}

export default Navbar;