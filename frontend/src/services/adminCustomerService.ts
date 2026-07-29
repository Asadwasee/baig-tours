// src/services/adminCustomerService.ts
import { apiFetch } from "./api";

export interface CustomerItem {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  whatsappNumber?: string;
  city?: string;
  nationality?: string;
  country?: string;
  cnic?: string;
  passportNumber?: string;
  address?: string;
  notes?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export async function getAdminCustomers(): Promise<CustomerItem[]> {
  const data = await apiFetch<any>("/customers");
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.customers)) return data.customers;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

export async function getAdminCustomerById(id: string): Promise<CustomerItem> {
  return apiFetch<CustomerItem>(`/customers/${id}`);
}

export async function updateCustomer(id: string, data: Partial<CustomerItem>): Promise<CustomerItem> {
  return apiFetch<CustomerItem>(`/customers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteCustomer(id: string): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/customers/${id}`, {
    method: "DELETE",
  });
}
