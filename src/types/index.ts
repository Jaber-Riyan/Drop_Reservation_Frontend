export interface User {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface Drop {
  id: number;
  name: string;
  category: string;
  initialStock: number;
  availableStock: number;
  startsAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  id: number;
  userId: number;
  dropId: number;
  status: 'ACTIVE' | 'PURCHASED' | 'EXPIRED';
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Purchase {
  purchaseId: number;
  username: string;
  dropId: number;
  dropName: string;
  purchasedAt: string;
}

export interface Activity {
  purchaseId: number;
  username: string;
  dropId: number;
  dropName: string;
  purchasedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface DropsResponse {
  success: boolean;
  message: string;
  data: Drop[];
}

export interface ReservationsResponse {
  success: boolean;
  message: string;
  data: Reservation[];
}

export interface ActivityResponse {
  success: boolean;
  message: string;
  data: Activity[];
}

export interface StockUpdatePayload {
  dropId: number;
  availableStock: number;
}

export interface PurchaseCreatedPayload {
  purchaseId: number;
  username: string;
  dropId: number;
  dropName: string;
  purchasedAt: string;
}