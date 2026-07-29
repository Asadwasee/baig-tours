// src/services/adminContactService.ts
import { apiFetch } from "./api";

export interface ContactItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  adminResponse?: string;
  createdAt: string;
}

export async function getAdminContacts(): Promise<ContactItem[]> {
  const data = await apiFetch<any>("/contacts/admin/all");
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.contacts)) return data.contacts;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

export async function replyContact(id: string, adminResponse: string): Promise<ContactItem> {
  return apiFetch<ContactItem>(`/contacts/admin/reply/${id}`, {
    method: "PUT",
    body: JSON.stringify({ adminResponse }),
  });
}

export async function deleteContact(id: string): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/contacts/admin/delete/${id}`, {
    method: "DELETE",
  });
}
