// components/about/TeamMembers.tsx
'use client';

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

interface TeamMember {
  id: number | string;
  name: string;
  role: string;
  image: string;
  bio: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

interface TeamMembersProps {
  team?: TeamMember[];
  title?: string;
  subtitle?: string;
  description?: string;
}

const defaultTeam: TeamMember[] = [
  {
    id: 1,
    name: "Muhammad Baig",
    role: "Founder & CEO",
    image: "/assets/images/team/team1.jpg",
    bio: "Passionate about creating unforgettable travel experiences with over 10 years of industry expertise.",
  },
  {
    id: 2,
    name: "Ayesha Khan",
    role: "Travel Consultant",
    image: "/assets/images/team/team2.jpg",
    bio: "Helping travelers discover the perfect destinations with personalized travel planning.",
  },
  {
    id: 3,
    name: "Ali Raza",
    role: "Operations Manager",
    image: "/assets/images/team/team3.jpg",
    bio: "Ensuring every tour operates smoothly from departure to return with exceptional service.",
  },
  {
    id: 4,
    name: "Fatima Noor",
    role: "Customer Support",
    image: "/assets/images/team/team4.jpg",
    bio: "Always ready to assist travelers with bookings, inquiries, and 24/7 support.",
  },
];

export default function TeamMembers({ 
  team = defaultTeam,
  title = "The People Behind Every Journey",
  subtitle = "Meet Our Team",
  description = "Our experienced travel professionals work together to make every journey smooth, memorable, and stress-free for our travelers."
}: TeamMembersProps) {
  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="container-custom">

        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            {subtitle}
          </span>
          <h2 className="mt-4 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            {title}
          </h2>
          <p className="mt-5 leading-8 text-gray-600">
            {description}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.id}
              className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="font-[var(--font-poppins)] text-2xl font-bold text-[#1E293B]">
                  {member.name}
                </h3>
                <p className="mt-2 font-medium text-[#F97316]">{member.role}</p>
                <p className="mt-5 leading-7 text-gray-600">{member.bio}</p>

                {/* Social */}
                <div className="mt-6 flex justify-center gap-4">
                  <a
                    href={member.socialLinks?.facebook || "#"}
                    className="rounded-full bg-[#F8FAFC] p-3 transition hover:bg-[#0F766E] hover:text-white"
                  >
                    <FaFacebookF size={18} />
                  </a>
                  <a
                    href={member.socialLinks?.instagram || "#"}
                    className="rounded-full bg-[#F8FAFC] p-3 transition hover:bg-[#F97316] hover:text-white"
                  >
                    <FaInstagram size={18} />
                  </a>
                  <a
                    href={member.socialLinks?.linkedin || "#"}
                    className="rounded-full bg-[#F8FAFC] p-3 transition hover:bg-[#0B5C56] hover:text-white"
                  >
                    <FaLinkedinIn size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}