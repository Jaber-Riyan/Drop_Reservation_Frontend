import { io, type Socket } from 'socket.io-client';
import { API_URL } from '../api/axios';

let socket: Socket | null = null;

export function getSocket(): Socket | null {
  return socket;
}

export function initializeSocket(userId: number): Socket {
  socket = io(API_URL, {
    auth: {
      userId,
    },
    autoConnect: true,
  });

  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}