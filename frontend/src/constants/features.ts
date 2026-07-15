import {
  ShieldCheck,
  Globe,
  Wallet,
  Headphones,
  MapPinned,
  Users,
} from "lucide-react";

import { Feature } from "@/types/feature";

export const features: Feature[] = [
  {
    id: 1,
    title: "Safe & Secure Travel",
    description:
      "Travel confidently with carefully planned itineraries, trusted transport, and reliable accommodations.",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Domestic & International Tours",
    description:
      "Explore breathtaking destinations across Pakistan and popular international locations.",
    icon: Globe,
  },
  {
    id: 3,
    title: "Affordable Packages",
    description:
      "Competitive pricing with transparent costs and excellent value for every traveler.",
    icon: Wallet,
  },
  {
    id: 4,
    title: "24/7 Customer Support",
    description:
      "Our dedicated support team is always available before, during, and after your trip.",
    icon: Headphones,
  },
  {
    id: 5,
    title: "Experienced Tour Guides",
    description:
      "Professional guides ensure a memorable, informative, and enjoyable travel experience.",
    icon: MapPinned,
  },
  {
    id: 6,
    title: "Trusted by Travelers",
    description:
      "Hundreds of satisfied travelers trust Baig Tours for unforgettable travel experiences.",
    icon: Users,
  },
];