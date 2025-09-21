import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';


export default function App() {
return (
<div className="min-h-dvh bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
<Navbar />
<main className="pb-16">
<Outlet />
</main>
<footer className="border-t border-gray-200 dark:border-gray-800 py-6 mt-10">
<div className="max-w-6xl mx-auto px-4 text-sm text-gray-500 flex items-center justify-between">
<span>Built with NASA APIs</span>
<a className="underline" href="https://github.com/yourname/nasa-explorer" target="_blank">GitHub</a>
</div>
</footer>
</div>
);
}