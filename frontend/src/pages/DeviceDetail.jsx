// Like the devices dashboard, but for inspecting one specific device
// 

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDeviceById } from "../api/devices";
import { getTelemetry } from "../api/telemetry";
import TelemetryChart from "../components/TelemetryChart";

function DeviceDetail() {
  const { id } = useParams();

  const [device, setDevice] = useState(null);
  const [telemetry, setTelemetry] = useState([]);

  useEffect(() => {
    async function loadDeviceData() {
      try {
        const deviceData = await getDeviceById(id);
        const telemetryData = await getTelemetry();

        const deviceTelemetry = telemetryData.filter(
          (reading) => String(reading.device) === String(id)
        );

        setDevice(deviceData);
        setTelemetry(deviceTelemetry);
      } catch (error) {
        console.error("Failed to load device detail:", error);
      }
    }

    loadDeviceData();
  }, [id]);

  if (!device) {
    return <p>Loading device...</p>;
  }

  return (
    <div>
      <h1>{device.name}</h1>

      <p><strong>Status:</strong> {device.status}</p>
      <p><strong>Location:</strong> {device.location}</p>

      <TelemetryChart
        data={telemetry.slice(-20)}
        dataKey="temperature"
        title="Temperature History"
      />

      <TelemetryChart
        data={telemetry.slice(-20)}
        dataKey="humidity"
        title="Humidity History"
      />
    </div>
  );
}

export default DeviceDetail;