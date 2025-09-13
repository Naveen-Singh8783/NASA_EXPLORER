import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';


export default function Navbar() {
const [open, setOpen] = useState(false);
const linkCls = ({ isActive }: { isActive: boolean }) =>
`px-3 py-2 rounded-xl text-sm ${isActive ? 'bg-brand-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`;


return (
<header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-950/60 border-b border-gray-200/70 dark:border-gray-800">
<nav className="container flex items-center justify-between h-14">
<Link to="/" className="flex items-center gap-2 font-semibold">
<span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">🛰️</span>
<span>NASA Explorer</span>
</Link>
<button className="md:hidden p-2" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">☰</button>
<div className={`md:flex items-center gap-2 ${open ? 'block' : 'hidden'} md:block`}>
<NavLink to="/" className={linkCls} end>Dashboard</NavLink>
<NavLink to="/mars" className={linkCls}>Mars</NavLink>
<NavLink to="/neo" className={linkCls}>NEO</NavLink>
<a href="https://api.nasa.gov/" target="_blank" className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">API Docs ↗</a>
</div>
</nav>
</header>
);
}