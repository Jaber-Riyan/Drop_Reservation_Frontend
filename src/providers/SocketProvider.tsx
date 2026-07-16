import { useEffect, type ReactNode } from 'react';
import { initializeSocket, disconnectSocket, getSocket } from '../socket/socket';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/Toast';
import { setupSocketListeners } from '../socket/listeners';
import { SocketContext } from './socket.context';

export function SocketProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (isAuthenticated && user) {
      const socket = initializeSocket(user.id);
      
      socket.on('connect', () => {
        console.log('Socket connected');
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      setupSocketListeners(socket, toast.showToast);

      return () => {
        disconnectSocket();
      };
    } else {
      disconnectSocket();
    }
  }, [isAuthenticated, user, toast]);

  return (
    <SocketContext.Provider value={{ socket: getSocket() }}>
      {children}
    </SocketContext.Provider>
  );
}
