import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './styles/globals.css';
import { AuthProvider } from './context/AuthContex';

createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
