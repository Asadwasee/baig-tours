// types/gallery.ts
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