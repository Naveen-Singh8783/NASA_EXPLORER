import { useState } from 'react';
import Section from '../components/Section';


interface Photo { id: number; img_src: string; earth_date: string; rover: { name: string }; camera: { name: string; full_name: string } }


export default function Mars() {
const [date, setDate] = useState('2015-06-03');
const [rover, setRover] = useState('curiosity');
const [camera, setCamera] = useState('');
const [photos, setPhotos] = useState<Photo[]>([]);
const [loading, setLoading] = useState(false);


async function load() {
setLoading(true);
try {
const base = import.meta.env.VITE_API_BASE as string;
const url = new URL('/api/mars', base);
url.searchParams.set('earth_date', date);
url.searchParams.set('rover', rover);
if (camera) url.searchParams.set('camera', camera);
const res = await fetch(url.toString());
const data = await res.json();
setPhotos(data.photos || []);
} finally { setLoading(false); }
}


return (
<Section
title="Mars Rover Photos"
subtitle="Browse images captured by Curiosity, Perseverance, and more"
action={
<div className="flex flex-wrap gap-2">
<input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"/>
<select value={rover} onChange={e=>setRover(e.target.value)} className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
<option value="curiosity">Curiosity</option>
<option value="perseverance">Perseverance</option>
<option value="opportunity">Opportunity</option>
<option value="spirit">Spirit</option>
</select>
<input placeholder="Camera (e.g. FHAZ)" value={camera} onChange={e=>setCamera(e.target.value.toUpperCase())} className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"/>
<button onClick={load} className="px-3 py-2 rounded-lg bg-brand-600 text-white">Search</button>
</div>
}
>
{loading && <p>Loading…</p>}
{!loading && photos.length === 0 && <p className="text-gray-500">No photos yet. Choose filters and click Search.</p>}
<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
{photos.map(p => (
<figure key={p.id} className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
<img src={p.img_src} alt={p.camera.full_name} className="w-full h-44 object-cover" />
<figcaption className="p-3 text-sm text-gray-700 dark:text-gray-300">
<div className="font-medium">{p.rover.name} • {p.camera.name}</div>
<div className="text-gray-500">{p.earth_date}</div>
</figcaption>
</figure>
))}
</div>
</Section>
);
}