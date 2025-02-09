import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Globale Styles
import App from './App.jsx'; // Hauptkomponente mit Routing

// Render der React-App im Root-Div
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);