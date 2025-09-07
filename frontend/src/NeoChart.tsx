import { useState } from "react";
import { fetchNEO } from "./api";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function NeoChart() {
  const [start, setStart] = useState("2024-10-01");
  const [end, setEnd] = useState("2024-10-07");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const result = await fetchNEO({ start, end });
      const map = result.near_earth_objects || {};
      const rows = Object.entries(map).map(([date, arr]) => ({
        date,
        count: arr.length,
        max_diameter_km: Math.max(...arr.map(n => n.estimated_diameter.kilometers.estimated_diameter_max))
      })).sort((a,b)=> a.date.localeCompare(b.date));
      setData(rows);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ marginTop: "3rem" }}>
      <h2>Near-Earth Objects (NEO) per day</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "0.5rem 0" }}>
        <input type="date" value={start} onChange={e=>setStart(e.target.value)} />
        <input type="date" value={end} onChange={e=>setEnd(e.target.value)} />
        <button onClick={load}>Load</button>
      </div>
      {loading && <p>Loading…</p>}
      {!loading && data.length > 0 && (
        <div style={{ width: "100%", height: 360 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="count" />
              <Line yAxisId="right" type="monotone" dataKey="max_diameter_km" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      {!loading && data.length === 0 && <p>No data yet. Choose a range and click Load.</p>}
    </section>
  );
}
