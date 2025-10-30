import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// Disable console logging in production environment
if (process.env.NODE_ENV === 'production') {
  // Store original console methods
  const originalConsole = {
    log: console.log,
    info: console.info,
    debug: console.debug,
    warn: console.warn
  };

  // Override console methods in production
  console.log = function() {
    // No operation in production
  };
  
  console.info = function() {
    // No operation in production
  };
  
  console.debug = function() {
    // No operation in production
  };
  
  console.warn = function() {
    // No operation in production
  };
  
  // Optional: Log a single message when the app starts
  originalConsole.log('Console logging disabled in production mode');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
