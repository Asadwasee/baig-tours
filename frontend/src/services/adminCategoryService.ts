// src/services/adminCategoryService.ts
import { apiFetch } from "./api";

export interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  isActive?: boolean;
  createdAt?: string;
}

export async function getAdminCategories(): Promise<CategoryItem[]> {
  const data = await apiFetch<any>("/categories/getall?includeInactive=true");
  let rawList: any[] = [];
  if (Array.isArray(data)) rawList = data;
  else if (data && Array.isArray(data.categories)) rawList = data.categories;
  else if (data && Array.isArray(data.data)) rawList = data.data;

  return rawList.map((item) => ({
    ...item,
    _id: item._id || item.id,
  }));
}

export async function createCategory(data: Partial<CategoryItem>): Promise<CategoryItem> {
  return apiFetch<CategoryItem>("/categories/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCategory(id: string, data: Partial<CategoryItem>): Promise<CategoryItem> {
  return apiFetch<CategoryItem>(`/categories/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteCategory(id: string): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/categories/delete/${id}`, {
    method: "DELETE",
  });
}
