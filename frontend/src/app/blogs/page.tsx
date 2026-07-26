import FeaturedBlogs from "@/components/blogs/FeaturedBlogs";
import BlogCategories from "@/components/blogs/BlogCategories";
import BlogList from "@/components/blogs/BlogList";

import {
  getBlogs,
  getFeaturedBlogs,
  getBlogCategories
} from "@/services/blogService";


export default async function BlogsPage() {

  const featuredBlogs = await getFeaturedBlogs();
  const blogsResponse = await getBlogs();
  const categories = await getBlogCategories();


  return (
    <main className="min-h-screen bg-gray-50 py-12">

      <div className="max-w-7xl mx-auto px-5">

        <h1 className="text-4xl font-bold text-center mb-3">
          Travel Blogs
        </h1>


        <p className="text-center text-gray-500 mb-10">
          Explore travel stories and destination guides.
        </p>


        <FeaturedBlogs blogs={featuredBlogs}/>

        <BlogCategories categories={categories}/>

        <BlogList blogs={blogsResponse.data}/>


      </div>

    </main>
  );
}