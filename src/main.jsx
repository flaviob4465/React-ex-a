import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// TODO — Importa Provider de 'react-redux' e a store de './store.js'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* TODO — Envolve <App /> com <Provider store={store}> */}
    <App />
  </StrictMode>,
)
