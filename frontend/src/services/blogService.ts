// src/services/blogService.ts
import axios from 'axios';

const API_URL = 
  process.env.NEXT_PUBLIC_API_URL || 
  process.env.NEXT_PUBLIC_BACKEND_URL || 
  'http://localhost:5000';

// 1. Get Featured Blogs
export const getFeaturedBlogs = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/blogs/featured?limit=6`);
    return res.data?.data || [];
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    return [];
  }
};

// 2. Get All Blogs
export const getBlogs = async (page = 1, limit = 10) => {
  try {
    const res = await axios.get(`${API_URL}/api/blogs/get?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { data: [], pagination: {} };
  }
};

export const getAllBlogs = getBlogs;

// 3. Get Blog Categories
export const getBlogCategories = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/blogs/categories`);
    return res.data?.data || [];
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }
};

// 4. Get Single Blog By Slug
export const getBlogBySlug = async (slug: string) => {
  try {
    const res = await axios.get(`${API_URL}/api/blogs/slug/${slug}`);
    return res.data?.data || null;
  } catch (error) {
    console.error(`Error fetching blog [${slug}]:`, error);
    return null;
  }
};