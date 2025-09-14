import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';


interface NEOItem {
estimated_diameter: { kilometers: { estimated_diameter_max: number } };
}


export default function NeoChart() {
const [start, setStart] = useState('2024-10-01');
const [end, setEnd] = useState('2024-10-07');
const [rows, setRows] = useState<{ date: string; count: number; max_diameter_km: number }[]>([]);
const [loading, setLoading] = useState(false);


async function load() {
setLoading(true);
try {
const base = import.meta.env.VITE_API_BASE as string;
const url = new URL('/api/neo', base);
url.searchParams.set('start_date', start);
url.searchParams.set('end_date', end);
const res = await fetch(url.toString());
if (!res.ok) throw new Error(`NEO error ${res.status}`);
const data = await res.json();
const map: Record<string, NEOItem[]> = data.near_earth_objects || {};
const out = Object.entries(map).map(([date, arr]) => ({
date,
count: arr.length,
max_diameter_km: Math.max(...arr.map(n => n.estimated_diameter.kilometers.estimated_diameter_max))
})).sort((a,b)=> a.date.localeCompare(b.date));
setRows(out);
} finally { setLoading(false); }
}


return (
<div>
<div className="flex gap-2 mb-3">
<input type="date" value={start} onChange={e=>setStart(e.target.value)} className="border rounded-lg px-3 py-2" />
<input type="date" value={end} onChange={e=>setEnd(e.target.value)} className="border rounded-lg px-3 py-2" />
<button onClick={load} className="px-3 py-2 rounded-lg bg-brand-600 text-white">Load</button>
</div>
{loading && <p>Loading…</p>}
{!loading && rows.length > 0 && (
<div style={{ width: '100%', height: 360 }}>
<ResponsiveContainer>
<LineChart data={rows}>
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
{!loading && rows.length === 0 && <p className="text-gray-500">No data yet. Choose a range and click Load.</p>}
</div>
);
}