const BASE = import.meta.env.VITE_API_BASE;

export async function fetchAPOD(date: any) {
    const url = new URL(`/api/apod`,BASE);
    if(date)url.searchParams.set('date', date);
    const res = await fetch(url);
    if(!res.ok)throw new Error(`APOD error: ${res.status}`);
    return res.json();
}

export async function fetchMars({date, rover, camera}: {date: any, rover: any, camera: any}){
    const url = new URL(`/api/mars`, BASE);
    if(date)url.searchParams.set('earth_date', date);
    if(rover)url.searchParams.set('rover', rover);
    if(camera)url.searchParams.set('camera', camera);
    const res = await fetch(url);
    if(!res.ok)throw new Error(`Mars error: ${res.status}`);
    return res.json();
}

export async function fetchNEO({start, end}: {start: any, end: any}){
    const url = new URL(`/api/neo`, BASE);
    if(start)url.searchParams.set('start_date', start);
    if(end)url.searchParams.set('end_date', end);
    const res = await fetch(url);
    if(!res.ok)throw new Error(`Neo erro: ${res.status}`);
    return res.json();
}