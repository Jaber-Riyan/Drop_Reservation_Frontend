import { axiosInstance } from './axios';
import type { Reservation, ReservationsResponse } from '../types';

export const reservationApi = {
  create: async (userId: number, dropId: number): Promise<Reservation> => {
    const response = await axiosInstance.post<ReservationsResponse>('/reservations', {
      userId,
      dropId,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to create reservation');
    }

    return response.data.data[0];
  },

  getUserReservations: async (userId: number): Promise<Reservation[]> => {
    const response = await axiosInstance.get<ReservationsResponse>(`/reservation/user/${userId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch reservations');
    }
    return response.data.data;
  },
};