import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './providers/auth.context'
import { QueryProvider } from './providers/QueryProvider'
import { ToastProvider } from './components/Toast'
import { SocketProvider } from './providers/SocketProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <ToastProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </ToastProvider>
      </AuthProvider>
    </QueryProvider>
  </StrictMode>,
)
