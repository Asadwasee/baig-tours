// services/reviews.ts
import { apiFetch } from './api';

export interface Review {
  _id: string;
  customerName: string;
  customerEmail: string;
  tourName: string;
  packageId: string;
  rating: number;
  review: string;
  status: 'pending' | 'approved' | 'rejected';
  isActive: boolean;
  createdAt: string;
}

export const getApprovedReviews = async (params?: {
  packageId?: string;
  page?: number;
  limit?: number;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.packageId) queryParams.append('packageId', params.packageId);
  if (params?.limit) queryParams.append('limit', String(params.limit));
  const query = queryParams.toString();
  return apiFetch<Review[]>(`/reviews/approved_reviews${query ? `?${query}` : ''}`);
};