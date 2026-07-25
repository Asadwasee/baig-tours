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
  console.log('🔍 getPackageById called with ID:', id);
  
  try {
    // apiFetch will now handle the 'package' property and return it directly
    const data = await apiFetch<Package>(`/packages/${id}`);
    
    console.log('📦 Package data received:', data);
    console.log('📦 Title:', data?.title);
    console.log('📦 Price:', data?.price);
    console.log('📦 _id:', data?._id);
    
    if (!data) {
      throw new Error('No data received from API');
    }
    
    if (!data._id && !data.title) {
      console.warn('⚠️ Package data missing _id or title', data);
    }
    
    return data;
  } catch (error) {
    console.error('❌ Error in getPackageById:', error);
    throw error;
  }
}