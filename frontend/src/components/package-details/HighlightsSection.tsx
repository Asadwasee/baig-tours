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
      icon: <Mountain size={20} />,
      title: "Khunjerab Pass",
    },
    {
      icon: <Camera size={20} />,
      title: "Attabad Lake",
    },
    {
      icon: <Sunrise size={20} />,
      title: "Eagle Nest Sunrise",
    },
    {
      icon: <Trees size={20} />,
      title: "Altit & Baltit Fort",
    },
    {
      icon: <Ship size={20} />,
      title: "Boating Experience",
    },
    {
      icon: <Tent size={20} />,
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
    <section className="bg-white py-16">
      <div className="container-custom">

        {/* Heading */}

        <div className="mb-12">

          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            Tour Experience
          </span>

          <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            Highlights & Services
          </h2>

        </div>

        {/* Highlights */}

        <div className="mb-14">

          <h3 className="mb-6 font-[var(--font-poppins)] text-2xl font-bold text-[#1E293B]">
            Tour Highlights
          </h3>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {highlights.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-[#F8FAFC] p-5 transition hover:-translate-y-1 hover:border-[#0F766E] hover:shadow-md"
              >
                <div className="rounded-xl bg-[#0F766E]/10 p-3 text-[#0F766E]">
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

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Included */}

          <div className="rounded-3xl border border-green-200 bg-green-50 p-8">

            <h3 className="mb-6 flex items-center gap-3 font-[var(--font-poppins)] text-2xl font-bold text-[#16A34A]">

              <CheckCircle2 />

              Included Services

            </h3>

            <div className="space-y-4">

              {included.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="text-[#16A34A]"
                  />

                  <span>{item}</span>

                </div>
              ))}

            </div>

          </div>

          {/* Excluded */}

          <div className="rounded-3xl border border-red-200 bg-red-50 p-8">

            <h3 className="mb-6 flex items-center gap-3 font-[var(--font-poppins)] text-2xl font-bold text-[#DC2626]">

              <XCircle />

              Excluded Services

            </h3>

            <div className="space-y-4">

              {excluded.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <XCircle
                    size={20}
                    className="text-[#DC2626]"
                  />

                  <span>{item}</span>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}