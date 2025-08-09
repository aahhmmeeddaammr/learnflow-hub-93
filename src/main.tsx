import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext'
import { ExcuseProvider } from './contexts/ExcuseContext'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ExcuseProvider>
        <App />
      </ExcuseProvider>
    </AuthProvider>
  </StrictMode>,
)
