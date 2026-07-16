import { axiosInstance } from './axios';
import type { AuthResponse, User } from '../types';

export const authApi = {
  register: async (username: string): Promise<User> => {
    const response = await axiosInstance.post<AuthResponse>('/users/register', {
      username,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Registration failed');
    }

    return response.data.data;
  },
};