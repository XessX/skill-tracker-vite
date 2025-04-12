import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { HeadProvider } from 'react-head';
import { BrowserRouter } from 'react-router-dom'; // ✅ import
import { Toaster } from 'react-hot-toast'; // ✅ toast system

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeadProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: "#333", color: "#fff" },
          }}
        />
      </BrowserRouter>
    </HeadProvider>
  </React.StrictMode>
);
