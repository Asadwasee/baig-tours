import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export interface ContactData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}


export const submitContact = async (
  data: ContactData
) => {

  const res = await axios.post(
    `${API_URL}/api/contacts/submit`,
    data
  );

  return res.data;
};