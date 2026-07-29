// services/api.ts

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken") || localStorage.getItem("token")
      : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string> || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch data.");
  }

  const data = await response.json();

  // CHECK 1: Does it have a 'packages' property? (packages list)
  if (data && 'packages' in data) {
    return data.packages as T;
  }

  // CHECK 2: Does it have a 'package' property? (single package)
  if (data && 'package' in data) {
    return data.package as T;
  }

  // CHECK 3: Does it have 'success' wrapper?
  if (data && typeof data === 'object' && 'success' in data) {
    return data.data || data;
  }

  // Otherwise, return as-is
  return data;
}