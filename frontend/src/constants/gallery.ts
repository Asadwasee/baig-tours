export interface GalleryItem {
  id: number;
  title: string;
  category: "Domestic Tours" | "International Tours" | "Customer Memories";
  type: "image" | "video";
  thumbnail: string;
  src: string;
}

export const galleryItems: GalleryItem[] = [
  // =========================
  // Domestic Tours
  // =========================

  {
    id: 1,
    title: "Hunza Valley",
    category: "Domestic Tours",
    type: "image",
    thumbnail: "/assets/images/gallery/hunza.jpg",
    src: "/assets/images/gallery/hunza.jpg",
  },

  {
    id: 2,
    title: "Skardu Mountains",
    category: "Domestic Tours",
    type: "image",
    thumbnail: "/assets/images/gallery/skardu.jpg",
    src: "/assets/images/gallery/skardu.jpg",
  },

  {
    id: 3,
    title: "Fairy Meadows",
    category: "Domestic Tours",
    type: "image",
    thumbnail: "/assets/images/gallery/fairy-meadows.jpg",
    src: "/assets/images/gallery/fairy-meadows.jpg",
  },

  {
    id: 4,
    title: "Swat Valley",
    category: "Domestic Tours",
    type: "image",
    thumbnail: "/assets/images/gallery/swat.jpg",
    src: "/assets/images/gallery/swat.jpg",
  },

  {
    id: 5,
    title: "Naran Kaghan",
    category: "Domestic Tours",
    type: "image",
    thumbnail: "/assets/images/gallery/naran.jpg",
    src: "/assets/images/gallery/naran.jpg",
  },

  {
    id: 6,
    title: "Hunza Trip Video",
    category: "Domestic Tours",
    type: "video",
    thumbnail: "/assets/images/gallery/hunza-video.jpg",
    src: "/assets/images/gallery/hunza-video.mp4",
  },

  // =========================
  // International Tours
  // =========================

  {
    id: 7,
    title: "Turkey",
    category: "International Tours",
    type: "image",
    thumbnail: "/assets/images/gallery/turkey.jpg",
    src: "/assets/images/gallery/turkey.jpg",
  },

  {
    id: 8,
    title: "Dubai",
    category: "International Tours",
    type: "image",
    thumbnail: "/assets/images/gallery/dubai.jpg",
    src: "/assets/images/gallery/dubai.jpg",
  },

  {
    id: 9,
    title: "Bali",
    category: "International Tours",
    type: "image",
    thumbnail: "/assets/images/gallery/bali.jpg",
    src: "/assets/images/gallery/bali.jpg",
  },

  {
    id: 10,
    title: "Thailand",
    category: "International Tours",
    type: "image",
    thumbnail: "/assets/images/gallery/thailand.jpg",
    src: "/assets/images/gallery/thailand.jpg",
  },

  {
    id: 11,
    title: "Malaysia",
    category: "International Tours",
    type: "image",
    thumbnail: "/assets/images/gallery/malaysia.jpg",
    src: "/assets/images/gallery/malaysia.jpg",
  },

  {
    id: 12,
    title: "Turkey Tour Video",
    category: "International Tours",
    type: "video",
    thumbnail: "/assets/images/gallery/turkey-video.jpg",
    src: "/assets/images/gallery/turkey-video.mp4",
  },

  // =========================
  // Customer Memories
  // =========================

  {
    id: 13,
    title: "Happy Travelers",
    category: "Customer Memories",
    type: "image",
    thumbnail: "/assets/images/gallery/customer-1.jpg",
    src: "/assets/images/gallery/customer-1.jpg",
  },

  {
    id: 14,
    title: "Group Adventure",
    category: "Customer Memories",
    type: "image",
    thumbnail: "/assets/images/gallery/customer-2.jpg",
    src: "/assets/images/gallery/customer-2.jpg",
  },

  {
    id: 15,
    title: "Family Vacation",
    category: "Customer Memories",
    type: "image",
    thumbnail: "/assets/images/gallery/customer-3.jpg",
    src: "/assets/images/gallery/customer-3.jpg",
  },

  {
    id: 16,
    title: "Camping Night",
    category: "Customer Memories",
    type: "image",
    thumbnail: "/assets/images/gallery/customer-4.jpg",
    src: "/assets/images/gallery/customer-4.jpg",
  },

  {
    id: 17,
    title: "Snow Adventure",
    category: "Customer Memories",
    type: "image",
    thumbnail: "/assets/images/gallery/customer-5.jpg",
    src: "/assets/images/gallery/customer-5.jpg",
  },

  {
    id: 18,
    title: "Customer Experience Video",
    category: "Customer Memories",
    type: "video",
    thumbnail: "/assets/images/gallery/customer-video.jpg",
    src: "/assets/images/gallery/customer-video.mp4",
  },
];