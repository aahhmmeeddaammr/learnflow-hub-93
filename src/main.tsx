import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext'
import { ExcuseProvider } from './contexts/ExcuseContext'
import { HRProvider } from './contexts/HRContext'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <HRProvider>
        <ExcuseProvider>
          <App />
        </ExcuseProvider>
      </HRProvider>
    </AuthProvider>
  </StrictMode>,
)
