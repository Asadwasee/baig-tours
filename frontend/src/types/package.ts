// types/package.ts
export interface Package {
  _id?: string;
  id?: number | string;
  title: string;
  slug?: string;
  category?: string;
  destination: string;
  price: number;
  originalPrice?: number;
  discountPrice?: number;
  discount?: number;
  rating?: number;
  totalReviews?: number;
  duration?: string;
  availableSeats?: number;
  departureDate?: string;
  returnDate?: string;
  pickupLocation?: string;
  hotelInfo?: string;
  transportDetails?: string;
  mealsIncluded?: boolean;
  description?: string;
  highlights?: string[];
  includedServices?: string[];
  excludedServices?: string[];
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  images?: string[];
  image?: string;
  videos?: string[];
  promoVideo?: string;
  isFeatured?: boolean;
  isUpcoming?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type TourPackage = Package;