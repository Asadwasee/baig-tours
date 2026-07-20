import Image from "next/image";
import { CheckCircle2, Plane, Globe2, ShieldCheck } from "lucide-react";

export default function CompanyOverview() {
  return (
    <section className="bg-white py-20">

      <div className="container-custom">

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Left Image */}

          <div className="relative">

            <div className="relative h-[500px] overflow-hidden rounded-3xl shadow-xl">

              <Image
                src="/assets/images/about/company.jpg"
                alt="Baig Tours"
                fill
                className="object-cover"
              />

            </div>

            {/* Experience Badge */}

            <div className="absolute -bottom-8 -right-6 rounded-3xl bg-[#0F766E] px-8 py-6 text-white shadow-2xl">

              <h3 className="font-[var(--font-poppins)] text-4xl font-bold">
                10+
              </h3>

              <p className="mt-1 text-sm uppercase tracking-wide text-white/90">
                Years of Experience
              </p>

            </div>

          </div>

          {/* Right Content */}

          <div>

            <span className="font-semibold uppercase tracking-wider text-[#F97316]">
              Company Overview
            </span>

            <h2 className="mt-4 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
              Your Trusted Travel Partner
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Baig Tours is dedicated to creating memorable travel experiences
              across Pakistan and around the world. From breathtaking mountain
              adventures to luxurious international holidays, we focus on
              comfort, reliability, and exceptional customer service at every
              step of your journey.
            </p>

            <p className="mt-5 leading-8 text-gray-600">
              Our experienced travel consultants carefully design each package,
              ensuring quality accommodation, reliable transportation,
              professional tour guides, and unforgettable experiences for
              families, groups, honeymoon couples, and adventure seekers.
            </p>

            {/* Highlights */}

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">

                <CheckCircle2
                  className="text-[#16A34A]"
                  size={22}
                />

                <span className="text-[#1E293B]">
                  Trusted by thousands of satisfied travelers
                </span>

              </div>

              <div className="flex items-center gap-3">

                <CheckCircle2
                  className="text-[#16A34A]"
                  size={22}
                />

                <span className="text-[#1E293B]">
                  Carefully planned domestic & international tours
                </span>

              </div>

              <div className="flex items-center gap-3">

                <CheckCircle2
                  className="text-[#16A34A]"
                  size={22}
                />

                <span className="text-[#1E293B]">
                  Professional guides & 24/7 customer support
                </span>

              </div>

            </div>

            {/* Feature Cards */}

            <div className="mt-10 grid gap-5 sm:grid-cols-3">

              <div className="rounded-2xl bg-[#F8FAFC] p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                <Plane
                  className="mx-auto text-[#F97316]"
                  size={32}
                />

                <h4 className="mt-3 font-semibold text-[#1E293B]">
                  Premium Tours
                </h4>

              </div>

              <div className="rounded-2xl bg-[#F8FAFC] p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                <Globe2
                  className="mx-auto text-[#0F766E]"
                  size={32}
                />

                <h4 className="mt-3 font-semibold text-[#1E293B]">
                  Worldwide Destinations
                </h4>

              </div>

              <div className="rounded-2xl bg-[#F8FAFC] p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                <ShieldCheck
                  className="mx-auto text-[#16A34A]"
                  size={32}
                />

                <h4 className="mt-3 font-semibold text-[#1E293B]">
                  Safe & Reliable
                </h4>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}