const BASE = import.meta.env.VITE_API_BASE;

export async function fetchAPOD(date: any) {
    const url = new URL(`/api/apod`,BASE);
    if(date)url.searchParams.set('date', date);
    const res = await fetch(url);
    if(!res.ok)throw new Error(`APOD error: ${res.status}`);
    return res.json();
}