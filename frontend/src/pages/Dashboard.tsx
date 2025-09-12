import { useEffect, useState } from 'react';
import Section from '../components/Section';


interface APODData {
date: string;
title: string;
explanation: string;
url: string;
hdurl?: string;
media_type: 'image' | 'video';
}


export default function Dashboard() {
const [data, setData] = useState<APODData | null>(null);
const [date, setDate] = useState<string>('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');


async function load(d?: string) {
try {
setLoading(true); setError('');
const base = import.meta.env.VITE_API_BASE as string;
const url = new URL('/api/apod', base);
if (d) url.searchParams.set('date', d);
const res = await fetch(url.toString());
if (!res.ok) throw new Error(`APOD error ${res.status}`);
setData(await res.json());
} catch (e: any) {
setError(e.message || 'Failed to load'); setData(null);
} finally { setLoading(false); }
}


useEffect(() => { load(); }, []);


return (
<Section
title="Astronomy Picture of the Day"
subtitle="Explore today’s highlight or pick a date to travel back in time"
action={
<div className="flex items-center gap-2">
<input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"/>
<button onClick={()=>load(date)} className="px-3 py-2 rounded-lg bg-brand-600 text-white">Load</button>
<button onClick={()=>{setDate(''); load();}} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700">Today</button>
</div>
}
>
{loading && <p>Loading…</p>}
{error && <p className="text-red-600 dark:text-red-400">{error}</p>}
{data && (
<div className="grid md:grid-cols-2 gap-6 items-start">
<div>
{data.media_type === 'image' ? (
<img src={data.url} alt={data.title} className="w-full rounded-2xl border border-gray-200 dark:border-gray-800" />
) : (
<div className="aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
<iframe title="apod" src={data.url} className="w-full h-full" allowFullScreen />
</div>
)}
</div>
<div className="space-y-3">
<h3 className="text-2xl font-semibold">{data.title}</h3>
<p className="text-sm text-gray-500">{data.date}</p>
<p className="leading-relaxed text-gray-700 dark:text-gray-300">{data.explanation}</p>
{data.hdurl && <a className="inline-block mt-2 text-brand-700 dark:text-brand-300 underline" href={data.hdurl} target="_blank">Open HD image</a>}
</div>
</div>
)}
</Section>
);
}