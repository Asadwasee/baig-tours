import { SearchOption } from "@/types/search";

export const destinations: SearchOption[] = [
  { label: "Hunza", value: "hunza" },
  { label: "Skardu", value: "skardu" },
  { label: "Swat", value: "swat" },
  { label: "Naran", value: "naran" },
  { label: "Kashmir", value: "kashmir" },
  { label: "Murree", value: "murree" },
  { label: "Dubai", value: "dubai" },
  { label: "Turkey", value: "turkey" },
  { label: "Thailand", value: "thailand" },
  { label: "Malaysia", value: "malaysia" },
  { label: "Azerbaijan", value: "azerbaijan" },
];

export const categories: SearchOption[] = [
  { label: "Family Tours", value: "family" },
  { label: "Honeymoon Tours", value: "honeymoon" },
  { label: "Corporate Tours", value: "corporate" },
  { label: "Student Tours", value: "student" },
  { label: "Group Tours", value: "group" },
  { label: "Domestic Tours", value: "domestic" },
  { label: "International Tours", value: "international" },
  { label: "Weekend Tours", value: "weekend" },
];

export const durations: SearchOption[] = [
  { label: "Any Duration", value: "" },
  { label: "1 - 3 Days", value: "1-3" },
  { label: "4 - 6 Days", value: "4-6" },
  { label: "7 - 10 Days", value: "7-10" },
  { label: "10+ Days", value: "10+" },
];

export const priceRanges: SearchOption[] = [
  { label: "Any Price", value: "" },
  { label: "Below PKR 50,000", value: "50000" },
  { label: "PKR 50,000 - 100,000", value: "50000-100000" },
  { label: "PKR 100,000 - 200,000", value: "100000-200000" },
  { label: "Above PKR 200,000", value: "200000+" },
];