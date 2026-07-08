// This creates a reusable line chart for time-series visualization
// Specifically to monitor telemetry data over time

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function formatTime(value) {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TelemetryChart({ data, dataKey, title }) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-empty">
        <h3>{title}</h3>
        <p>No telemetry data available yet.</p>
      </div>
    );
  }

  return (
    <div className="telemetry-chart">
      <div className="chart-header">
        <h3>{title}</h3>
        <p>Latest {data.length} readings</p>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={data}
	margin={{
        top: 10,
        right: 20,
        left: 0,
        bottom: 10,
    	}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="created_at"
              tickFormatter={formatTime}
              minTickGap={30}
            />
            <YAxis />
            <Tooltip labelFormatter={formatTime} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#2563eb"
	      strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TelemetryChart;
