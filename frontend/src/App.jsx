// Sets up routing
// /              → Dashboard
// /devices       → Devices page
// /devices/1     → Device detail page
// /alerts        → Alerts page

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import DeviceDetail from "./pages/DeviceDetail";
import Alerts from "./pages/Alerts";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/devices/:id" element={<DeviceDetail />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>IoT Device Monitoring Platform</p>
        <span>Built with React • Django REST Framework • Docker • AWS EC2 • Terraform</span>
      </footer>
    </BrowserRouter>
  );
}

export default App;
