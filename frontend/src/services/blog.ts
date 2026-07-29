import { apiFetch } from "./api";

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  featuredImage: string;
  summary?: string;
  content: string;
  author: string;
  category: string;
  publishDate: string;
  readTime: number;
}

export async function getLatestBlogs(): Promise<Blog[]> {
  const blogs = await apiFetch<Blog[]>("/blogs/get");

  return blogs.slice(0, 3);
}