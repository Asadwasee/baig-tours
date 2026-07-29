// src/services/adminBlogService.ts
import { apiFetch } from "./api";

export interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  summary?: string;
  author?: string;
  featuredImage?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  views?: number;
  readTime?: number;
  createdAt?: string;
}

export async function getAdminBlogs(page = 1, limit = 50): Promise<BlogItem[]> {
  const data = await apiFetch<any>(`/blogs/get?includeDrafts=true&page=${page}&limit=${limit}`);
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.blogs)) return data.blogs;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

export async function createBlog(data: Partial<BlogItem>): Promise<BlogItem> {
  return apiFetch<BlogItem>("/blogs/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateBlog(id: string, data: Partial<BlogItem>): Promise<BlogItem> {
  return apiFetch<BlogItem>(`/blogs/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteBlog(id: string): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/blogs/delete/${id}`, {
    method: "DELETE",
  });
}
