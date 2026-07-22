import {
  CheckCircle2,
  XCircle,
  Mountain,
  Camera,
  Tent,
  Trees,
  Sunrise,
  Ship,
} from "lucide-react";

export default function HighlightsSection() {
  const highlights = [
    {
      icon: <Mountain size={22} />,
      title: "Khunjerab Pass",
    },
    {
      icon: <Camera size={22} />,
      title: "Attabad Lake",
    },
    {
      icon: <Sunrise size={22} />,
      title: "Eagle Nest Sunrise",
    },
    {
      icon: <Trees size={22} />,
      title: "Altit & Baltit Fort",
    },
    {
      icon: <Ship size={22} />,
      title: "Boating Experience",
    },
    {
      icon: <Tent size={22} />,
      title: "Bonfire Night",
    },
  ];

  const included = [
    "Luxury Transport",
    "4-Star Hotel Accommodation",
    "Breakfast & Dinner",
    "Professional Tour Guide",
    "Sightseeing Tours",
    "Photography Stops",
  ];

  const excluded = [
    "Lunch",
    "Personal Shopping",
    "Laundry",
    "Travel Insurance",
    "Visa Fee",
    "Personal Expenses",
  ];

  return (
    <section className="bg-white py-20">
      <div className="container-custom">

        {/* Heading */}

        <div className="max-w-3xl">

          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            Tour Experience
          </span>

          <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            Highlights & Services
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Experience the very best of Hunza through breathtaking landscapes,
            unforgettable attractions, and premium travel services carefully
            designed to make your journey comfortable and memorable.
          </p>

        </div>

        {/* Tour Highlights */}

        <div className="mt-14">

          <h3 className="mb-6 font-[var(--font-poppins)] text-2xl font-bold text-[#1E293B]">
            Tour Highlights
          </h3>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

            {highlights.map((item) => (

              <div
                key={item.title}
                className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E]/20 hover:shadow-lg"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#0F766E] transition group-hover:bg-[#0F766E]/10">

                  {item.icon}

                </div>

                <span className="font-medium text-[#1E293B]">
                  {item.title}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Included & Excluded */}

        <div className="mt-16 grid gap-8 lg:grid-cols-2">

          {/* Included */}

          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">

                <CheckCircle2
                  size={24}
                  className="text-green-600"
                />

              </div>

              <div>

                <h3 className="font-[var(--font-poppins)] text-2xl font-bold text-[#1E293B]">
                  What's Included
                </h3>

                <p className="text-sm text-gray-500">
                  Everything covered in your package
                </p>

              </div>

            </div>

            <div className="space-y-4">

              {included.map((item) => (

                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl bg-[#F8FAFC] px-5 py-4"
                >

                  <div className="flex items-center gap-3">

                    <CheckCircle2
                      size={18}
                      className="text-green-600"
                    />

                    <span className="font-medium text-[#1E293B]">
                      {item}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Excluded */}

          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">

                <XCircle
                  size={24}
                  className="text-red-500"
                />

              </div>

              <div>

                <h3 className="font-[var(--font-poppins)] text-2xl font-bold text-[#1E293B]">
                  Not Included
                </h3>

                <p className="text-sm text-gray-500">
                  Expenses not covered in this package
                </p>

              </div>

            </div>

            <div className="space-y-4">

              {excluded.map((item) => (

                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl bg-[#F8FAFC] px-5 py-4"
                >

                  <div className="flex items-center gap-3">

                    <XCircle
                      size={18}
                      className="text-red-500"
                    />

                    <span className="font-medium text-[#1E293B]">
                      {item}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}