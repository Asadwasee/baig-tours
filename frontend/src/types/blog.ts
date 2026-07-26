export interface Blog {
  _id: string;
  title: string;
  slug: string;
  featuredImage: string;
  content: string;
  author: string;
  authorImage: string;
  publishDate: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  readTime: number;
}