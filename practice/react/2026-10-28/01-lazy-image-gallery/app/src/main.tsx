import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LazyLoadingConcepts from './LazyLoadingConcepts.tsx'

const page = window.location.pathname === '/demo' ? <LazyLoadingConcepts /> : <App />

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {page}
  </StrictMode>,
)
