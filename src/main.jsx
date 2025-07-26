import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'      // ✅ Correctly importing App
import './index.css'             // ✅ Importing Tailwind CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
