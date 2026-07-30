import { apiFetch } from "./api";

export interface GalleryMedia {
  _id: string;
  title: string;
  description?: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  category: 'domestic' | 'international' | 'customer-memories';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryStats {
  domestic: number;
  international: number;
  customerMemories: number;
}




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
  const endpoint = `/gallery/media/getall${query ? `?${query}` : ''}`;

  const response = await apiFetch<GalleryMedia[]>(endpoint);

  if (Array.isArray(response)) {
    return response;
  }

  if (response && (response as any).data && Array.isArray((response as any).data)) {
    return (response as any).data;
  }

  return [];
}

// Get gallery by category
export async function getGalleryByCategory(category: string): Promise<GalleryMedia[]> {
  const response = await apiFetch<GalleryMedia[]>(`/gallery/media/category/${category}`);
  
  if (Array.isArray(response)) return response;
  if (response && (response as any).data && Array.isArray((response as any).data)) {
    return (response as any).data;
  }
  return [];
}

// Get media stats (counts per category)
export async function getGalleryStats(): Promise<GalleryStats> {
  try {
    const response = await apiFetch<any>('/gallery/media/media_stats');
    
    // If response has the stats directly
    if (response && typeof response === 'object') {
      if ('domestic' in response || 'international' in response || 'customerMemories' in response) {
        return {
          domestic: response.domestic || 0,
          international: response.international || 0,
          customerMemories: response.customerMemories || 0
        };
      }
      // If stats are inside data
      if (response.data) {
        return {
          domestic: response.data.domestic || 0,
          international: response.data.international || 0,
          customerMemories: response.data.customerMemories || 0
        };
      }
    }
    
    return { domestic: 0, international: 0, customerMemories: 0 };
  } catch (error) {
    console.error('Error fetching gallery stats:', error);
    return { domestic: 0, international: 0, customerMemories: 0 };
  }
}