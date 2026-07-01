// This creates a reusable line chart for time-series visualization
// Specifically to monitor telemetry data over time

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from "recharts";

function TelemetryChart({ data, dataKey, title }) {
  return (
    <div style={{ width: "100%", height: 300, marginTop: "20px" }}>
      <h3>{title}</h3>

      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TelemetryChart;