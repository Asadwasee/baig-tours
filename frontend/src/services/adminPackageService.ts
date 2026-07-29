// src/services/adminPackageService.ts
import { apiFetch } from "./api";

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PackageItem {
  _id: string;
  title: string;
  slug?: string;
  destination: string;
  duration?: string;
  price: number;
  discountPrice?: number;
  category?: string;
  availableSeats?: number;
  departureDate?: string;
  returnDate?: string;
  pickupLocation?: string;
  hotelInfo?: string;
  transportDetails?: string;
  mealsIncluded?: boolean;
  featured?: boolean;
  isFeatured?: boolean;
  isUpcoming?: boolean;
  description?: string;
  highlights?: string[];
  includedServices?: string[];
  excludedServices?: string[];
  itinerary?: ItineraryItem[];
  faqs?: FaqItem[];
  images?: string[];
  createdAt?: string;
}

export async function getAdminPackages(): Promise<PackageItem[]> {
  const data = await apiFetch<any>("/packages");
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.packages)) return data.packages;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

export async function getPackageById(id: string): Promise<PackageItem> {
  return apiFetch<PackageItem>(`/packages/${id}`);
}

export async function createPackage(data: Partial<PackageItem>): Promise<PackageItem> {
  return apiFetch<PackageItem>("/packages", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updatePackage(id: string, data: Partial<PackageItem>): Promise<PackageItem> {
  return apiFetch<PackageItem>(`/packages/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deletePackage(id: string): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/packages/${id}`, {
    method: "DELETE",
  });
}

export async function duplicatePackage(id: string): Promise<PackageItem> {
  return apiFetch<PackageItem>(`/packages/${id}/duplicate`, {
    method: "POST",
  });
}
