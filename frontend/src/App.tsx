import { useEffect, useState } from "react";
import { fetchAPOD } from "./api";
// ...
import Mars from "./Mars";
// ...
<Mars />


interface APODData {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
}

function App() {
  const [data, setData] = useState<APODData | null>(null);
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function load(d?: string) {
    try {
      setLoading(true);
      setError("");
      const apod = await fetchAPOD(d);
      setData(apod);
    } catch (e: any) {
      setError(e.message || "Failed to load");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "1rem" }}>
      <h1>NASA Explorer — APOD</h1>

      <div style={{ display: "flex", gap: "0.5rem", margin: "1rem 0" }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={() => load(date)}>Load</button>
        <button onClick={() => { setDate(""); load(); }}>Today</button>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {data && (
        <article>
          <h2>{data.title}</h2>
          <p><i>{data.date}</i></p>
          {data.media_type === "image" ? (
            <img src={data.url} alt={data.title} style={{ width: "100%", borderRadius: 12 }} />
          ) : (
            <iframe
              title="apod-video"
              src={data.url}
              style={{ width: "100%", height: 480, border: 0, borderRadius: 12 }}
              allowFullScreen
            />
          )}
          {data.explanation && <p style={{ marginTop: "1rem" }}>{data.explanation}</p>}
        </article>
      )}
    </div>
  );
}

export default App;
