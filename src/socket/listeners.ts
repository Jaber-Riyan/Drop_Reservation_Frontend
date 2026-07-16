import type { Socket } from 'socket.io-client';
import { queryClient } from '../utils/queryClient';
import type { Drop, Reservation, Activity } from '../types';
import type { StockUpdatePayload, PurchaseCreatedPayload } from '../types';
import { SOCKET_EVENTS } from './events';

export function setupSocketListeners(socket: Socket, showToast: (message: string, type?: 'success' | 'error' | 'info') => void) {
  socket.on(SOCKET_EVENTS.DROP_STOCK_UPDATED, (payload: StockUpdatePayload) => {
    queryClient.setQueryData(['drops'], (oldData: { data: Drop[] } | undefined) => {
      if (!oldData?.data) return oldData;
      const drop = oldData.data.find(d => d.id === payload.dropId);
      if (drop && payload.availableStock > drop.availableStock) {
        showToast(`Stock restocked for ${drop.name}! ${payload.availableStock} units available.`, 'info');
      }
      return {
        ...oldData,
        data: oldData.data.map((drop) =>
          drop.id === payload.dropId
            ? { ...drop, availableStock: payload.availableStock }
            : drop
        ),
      };
    });
  });

  socket.on(SOCKET_EVENTS.RESERVATION_CREATED, () => {
    queryClient.invalidateQueries({ queryKey: ['reservations'] });
  });

  socket.on(SOCKET_EVENTS.RESERVATION_EXPIRED, () => {
    queryClient.setQueryData(['reservations'], (oldData: { data: Reservation[] } | undefined) => {
      if (!oldData?.data) return oldData;
      return {
        ...oldData,
        data: oldData.data.filter((reservation) => reservation.status === 'ACTIVE'),
      };
    });
    showToast('Your reservation has expired', 'error');
  });

  socket.on(SOCKET_EVENTS.PURCHASE_COMPLETED, () => {
    queryClient.setQueryData(['reservations'], (oldData: { data: Reservation[] } | undefined) => {
      if (!oldData?.data) return oldData;
      return {
        ...oldData,
        data: oldData.data.map((reservation) => ({
          ...reservation,
          status: 'PURCHASED' as const,
        })),
      };
    });
    showToast('Purchase completed successfully!', 'success');
  });

  socket.on(SOCKET_EVENTS.ACTIVITY_PURCHASE_CREATED, (payload: PurchaseCreatedPayload) => {
    queryClient.setQueryData(['activity'], (oldData: { data: Activity[] } | undefined) => {
      if (!oldData?.data) return oldData;
      const newActivity: Activity = {
        purchaseId: payload.purchaseId,
        username: payload.username,
        dropId: payload.dropId,
        dropName: payload.dropName,
        purchasedAt: payload.purchasedAt,
      };
      return {
        ...oldData,
        data: [newActivity, ...oldData.data].slice(0, 3),
      };
    });
  });
}
