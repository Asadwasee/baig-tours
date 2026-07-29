// src/services/settings.ts
import { apiFetch } from "./api";

export interface AboutUsData {
  title?: string;
  subtitle?: string;
  description?: string;
  companyTitle?: string;
  companyDescription?: string;
  fullDescription?: string;
  bannerImage?: string;
  highlights?: string[];
  mission?: string;
  vision?: string;
  missionPoints?: string[];
  visionPoints?: string[];
  teamMembers?: Array<{
    id: number | string;
    name: string;
    role: string;
    image: string;
    bio: string;
    socialLinks?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
    };
  }>;
}

export interface SettingsData {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  logo: string;
  favicon: string;
  socialLinks: Array<{
    platform: string;
    url: string;
    isActive: boolean;
  }>;
  aboutUs: AboutUsData;
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
  };
  footer: {
    content: string;
    copyright: string;
  };
}

// Get all settings (includes about us)
export async function getSettings(): Promise<SettingsData> {
  return apiFetch<SettingsData>('/settings/getall');
}

// Update settings
export async function updateSettings(data: Partial<SettingsData>): Promise<SettingsData> {
  return apiFetch<SettingsData>('/settings/update_settings', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Get about us only
export async function getAboutUs(): Promise<AboutUsData> {
  return apiFetch<AboutUsData>('/settings/about_us');
}