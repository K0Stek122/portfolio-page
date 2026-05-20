import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// This is specifically for GitHub SPA Rerouting.
const params = new URLSearchParams(window.location.search);
const redirectPath = params.get("p");
if (redirectPath) {
    window.history.replaceState(null, "", redirectPath);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
