import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import StarCanvas from '../StarCanvas'

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <StarCanvas />
    </BrowserRouter>
  </React.StrictMode>
);
