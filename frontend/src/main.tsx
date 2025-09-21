import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './app.css';
import Dashboard from './pages/Dashboard';
import Mars from './pages/Mars';
import Neo from './pages/Neo';


const router = createBrowserRouter([
{
path: '/',
element: <App />,
children: [
{ index: true, element: <Dashboard /> },
{ path: 'mars', element: <Mars /> },
{ path: 'neo', element: <Neo /> },
],
},
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<RouterProvider router={router} />
</React.StrictMode>
);