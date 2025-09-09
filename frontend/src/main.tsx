import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Mars from "./Mars";
import NeoChart from "./NeoChart";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Mars />
    <NeoChart />
  </StrictMode>,
)
