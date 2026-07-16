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
};