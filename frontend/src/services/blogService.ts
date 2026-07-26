import axios from "axios";
import { Blog } from "@/types/blog";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


interface BlogsResponse {
  success: boolean;
  message: string;
  data: Blog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}


// Blogs list
export const getBlogs = async (): Promise<BlogsResponse> => {

  const res = await axios.get<BlogsResponse>(
    `${API_URL}/api/blogs/get`
  );

  return res.data;
};


// Single blog detail
export const getBlogBySlug = async (
  slug: string
): Promise<Blog> => {

  const res = await axios.get(
    `${API_URL}/api/blogs/slug/${slug}`
  );

  return res.data.data;
};

export const getFeaturedBlogs = async () => {

  const res = await axios.get(
    `${API_URL}/api/blogs/featured?limit=6`
  );

  return res.data.data;
};

export const getBlogCategories = async () => {
  const res = await axios.get(
    `${API_URL}/api/blogs/categories`
  );

  return res.data.data;
};