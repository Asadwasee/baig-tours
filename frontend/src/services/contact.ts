import { apiFetch } from "./api";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  return apiFetch("/contacts/submit", {
    method: "POST",
    body: JSON.stringify(data),
  });
}