// services/gallery.ts
import { apiFetch } from "./api";
import { GalleryMedia, GalleryStats } from "@/types/gallery";

// Get all gallery media with filters
export async function getGalleryMedia(params?: {
  category?: 'domestic' | 'international' | 'customer-memories';
  mediaType?: 'image' | 'video';
  page?: number;
  limit?: number;
}): Promise<GalleryMedia[]> {
  const queryParams = new URLSearchParams();
  if (params?.category) queryParams.append('category', params.category);
  if (params?.mediaType) queryParams.append('mediaType', params.mediaType);
  if (params?.page) queryParams.append('page', String(params.page));
  if (params?.limit) queryParams.append('limit', String(params.limit));
  
  const query = queryParams.toString();
  return apiFetch<GalleryMedia[]>(`/gallery/media/getall${query ? `?${query}` : ''}`);
}

// Get gallery by category
export async function getGalleryByCategory(category: string): Promise<GalleryMedia[]> {
  return apiFetch<GalleryMedia[]>(`/gallery/media/category/${category}`);
}

// Get media stats (counts per category)
export async function getGalleryStats(): Promise<GalleryStats> {
  return apiFetch<GalleryStats>('/gallery/media/media_stats');
}