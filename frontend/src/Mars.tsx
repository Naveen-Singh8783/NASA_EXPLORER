import { useState } from "react";
import { fetchMars } from "./api";

export default function Mars() {
  const [date, setDate] = useState("2015-06-03");
  const [rover, setRover] = useState("curiosity");
  const [camera, setCamera] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchMars({ date, rover, camera });
      setPhotos(data.photos || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ marginTop: "3rem" }}>
      <h2>Mars Rover Photos</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "0.5rem 0" }}>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <select value={rover} onChange={e => setRover(e.target.value)}>
          <option value="curiosity">Curiosity</option>
          <option value="opportunity">Opportunity</option>
          <option value="spirit">Spirit</option>
          <option value="perseverance">Perseverance</option>
        </select>
        <input
          placeholder="camera (e.g. FHAZ, RHAZ, NAVCAM)"
          value={camera}
          onChange={e => setCamera(e.target.value.toUpperCase())}
        />
        <button onClick={load}>Search</button>
      </div>
      {loading && <p>Loading…</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 12 }}>
        {photos.map(p => (
          <figure key={p.id} style={{ border: "1px solid #eee", borderRadius: 10, padding: 8 }}>
            <img src={p.img_src} alt={p.camera.full_name} style={{ width: "100%", borderRadius: 8 }} />
            <figcaption style={{ fontSize: 12, marginTop: 6 }}>
              {p.rover.name} • {p.camera.name} • {p.earth_date}
            </figcaption>
          </figure>
        ))}
      </div>
      {!loading && photos.length === 0 && <p>No photos found for that query.</p>}
    </section>
  );
}
