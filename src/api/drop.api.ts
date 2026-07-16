import { axiosInstance } from './axios';
import type { Drop, DropsResponse } from '../types';

export const dropApi = {
  getAll: async (): Promise<Drop[]> => {
    const response = await axiosInstance.get<DropsResponse>('/drops');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch drops');
    }
    return response.data.data;
  },

  create: async (data: {
    name: string;
    category: string;
    initialStock: number;
    startsAt: string;
  }): Promise<Drop> => {
    const response = await axiosInstance.post<{ success: boolean; data: Drop; message?: string }>('/drops', data);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to create drop');
    }
    return response.data.data;
  },
};
