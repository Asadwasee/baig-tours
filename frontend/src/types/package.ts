export interface TourPackage {
  id: number;
  title: string;
  destination: string;
  category: string;
  image: string;
  duration: string;
  departureDate: string;
  price: number;

  // Optional (for API integration later)
  originalPrice?: number;
  discount?: number;
  discountPrice?: number;
  availableSeats?: number;
  rating?: number;
  totalReviews?: number;
  isFeatured?: boolean;
}