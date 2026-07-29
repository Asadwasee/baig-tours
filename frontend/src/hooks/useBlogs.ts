"use client";

import { useEffect, useState } from "react";
import { Blog, getLatestBlogs } from "@/services/blog";

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getLatestBlogs();
        setBlogs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return {
    blogs,
    loading,
    error,
  };
}