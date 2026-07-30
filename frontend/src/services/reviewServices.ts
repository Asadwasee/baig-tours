import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CreateReviewData {
  customerName: string;
  customerEmail: string;
  tourName: string;
  packageId: string;
  rating: number;
  review: string;
}

export const createReview = async (
  data: CreateReviewData
) => {
  const response = await axios.post(
    `${API_URL}/reviews/create_review`,
    data
  );

  return response.data;
};