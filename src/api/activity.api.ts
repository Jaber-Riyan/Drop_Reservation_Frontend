import { axiosInstance } from './axios';
import type { Activity, ActivityResponse } from '../types';

export const activityApi = {
  getLatest: async (): Promise<Activity[]> => {
    const response = await axiosInstance.get<ActivityResponse>('/activity/latest');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch activity');
    }
    return response.data.data;
  },
};