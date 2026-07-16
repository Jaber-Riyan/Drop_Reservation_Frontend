import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reservationApi } from '../api/reservation.api';
import { purchaseApi } from '../api/purchase.api';
import type { Reservation } from '../types';

export function useReservation(userId: number | undefined) {
  const queryClient = useQueryClient();

  const { data: reservations = [], isLoading } = useQuery({
    queryKey: ['reservations', userId],
    queryFn: () => reservationApi.getUserReservations(userId!),
    enabled: !!userId,
  });

  const createReservation = useMutation({
    mutationFn: ({ userId, dropId }: { userId: number; dropId: number }) =>
      reservationApi.create(userId, dropId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['drops'] });
    },
  });

  const createPurchase = useMutation({
    mutationFn: ({ userId, dropId, reservationId }: { userId: number; dropId: number; reservationId: number }) =>
      purchaseApi.create(userId, dropId, reservationId),
    onSuccess: (_, variables) => {
      // Invalidate reservations query to ensure fresh data is fetched when user returns
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });

  const activeReservation = reservations.find((r) => r.status === 'ACTIVE');

  return {
    reservations,
    activeReservation,
    isLoading,
    createReservation,
    createPurchase,
  };
}
