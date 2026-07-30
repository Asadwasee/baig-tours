// services/packages.ts
import { apiFetch } from "./api";
import { Package } from "@/types/package";

export async function getPackages(
  query = ""
): Promise<Package[]> {
  const response = await apiFetch<any>(`/packages${query}`);
  if (response && response.packages) {
    return response.packages;
  }
  return response || [];
}

export async function getPackageById(
  id: string
): Promise<Package> {
  try {
    const data = await apiFetch<Package>(`/packages/${id}`);

    if (!data) {
      throw new Error('No data received from API');
    }

    return data;
  } catch (error) {
    console.error('Error fetching package:', error);
    throw error;
  }
}