// src/services/dashboardService.ts
import { apiFetch } from "./api";

export interface DashboardStats {
  totalPackages: number;
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  customerCount: number;
  totalRevenue: number;
  currency: string;
}

export interface MonthlyChartData {
  months: string[];
  bookings: number[];
  revenue: number[];
}

export interface StatusDistributionItem {
  status: string;
  count: number;
  percentage: string | number;
}

export interface PopularDestinationItem {
  destination: string;
  bookings: number;
  revenue: number;
  percentage: string | number;
}

export interface RecentBookingItem {
  _id: string;
  bookingNumber?: string;
  customer?: {
    _id?: string;
    fullName?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  package?: {
    _id?: string;
    title?: string;
    destination?: string;
    price?: number;
  };
  travelersCount?: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface CompleteDashboardResponse {
  stats: DashboardStats;
  charts: {
    monthlyBookings: MonthlyChartData;
    statusDistribution: StatusDistributionItem[];
    popularDestinations: PopularDestinationItem[];
  };
  recentBookings: RecentBookingItem[];
}

export async function getCompleteDashboard(): Promise<CompleteDashboardResponse> {
  return apiFetch<CompleteDashboardResponse>("/dashboard/complete");
}

export async function getDashboardSummary(): Promise<DashboardStats> {
  return apiFetch<DashboardStats>("/dashboard/summary");
}

export async function getRecentBookings(limit: number = 5): Promise<RecentBookingItem[]> {
  return apiFetch<RecentBookingItem[]>(`/dashboard/recent-bookings?limit=${limit}`);
}
