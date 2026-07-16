import { axiosInstance } from './axios';

export const purchaseApi = {
  create: async (userId: number, dropId: number, reservationId: number): Promise<void> => {
    const response = await axiosInstance.post('/purchases', {
      userId,
      dropId,
      reservationId,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to create purchase');
    }
  },
};