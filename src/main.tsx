import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './providers/auth.context'
import { QueryProvider } from './providers/QueryProvider'
import { SocketProvider } from './providers/SocketProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthProvider>
    </QueryProvider>
  </StrictMode>,
)
