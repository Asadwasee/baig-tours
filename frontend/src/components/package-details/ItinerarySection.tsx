import { CalendarDays, MapPin } from "lucide-react";

const itinerary = [
  {
    day: "Day 1",
    title: "Islamabad → Naran",
    description:
      "Departure from Islamabad in the morning. Short stops along the way with an overnight stay in Naran.",
  },
  {
    day: "Day 2",
    title: "Naran → Hunza",
    description:
      "Travel through Babusar Top (seasonal) or Karakoram Highway to Hunza. Check in to the hotel and enjoy the evening.",
  },
  {
    day: "Day 3",
    title: "Hunza Sightseeing",
    description:
      "Visit Baltit Fort, Altit Fort, Karimabad Bazaar, Eagle Nest and enjoy the beautiful sunset.",
  },
  {
    day: "Day 4",
    title: "Attabad Lake & Passu",
    description:
      "Enjoy boating at Attabad Lake and explore Passu Cones, Hussaini Suspension Bridge and surrounding attractions.",
  },
  {
    day: "Day 5",
    title: "Khunjerab Pass",
    description:
      "Full-day excursion to Khunjerab Pass, the highest paved border crossing in the world.",
  },
  {
    day: "Day 6",
    title: "Return Journey",
    description:
      "Travel back towards Naran with sightseeing stops and overnight stay.",
  },
  {
    day: "Day 7",
    title: "Arrival in Islamabad",
    description:
      "Reach Islamabad with unforgettable memories of Northern Pakistan.",
  },
];

export default function ItinerarySection() {
  return (
    <section className="bg-[#F8FAFC] py-16">
      <div className="container-custom">

        {/* Heading */}

        <div className="mb-12">

          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            Travel Plan
          </span>

          <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            Day-by-Day Itinerary
          </h2>

          <p className="mt-4 max-w-3xl text-gray-600">
            Our carefully planned itinerary ensures you experience every
            highlight while enjoying a comfortable and memorable journey.
          </p>

        </div>

        <div className="relative">

          {/* Vertical Line */}

          <div className="absolute left-5 top-0 hidden h-full w-1 rounded bg-[#0F766E]/20 md:block" />

          <div className="space-y-8">

            {itinerary.map((item) => (
              <div
                key={item.day}
                className="relative flex gap-6"
              >

                {/* Timeline Dot */}

                <div className="hidden md:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0F766E] text-white shadow-lg">

                  <CalendarDays size={18} />

                </div>

                {/* Card */}

                <div className="flex-1 rounded-3xl bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                  <span className="inline-block rounded-full bg-[#F97316]/10 px-4 py-1 text-sm font-semibold text-[#F97316]">
                    {item.day}
                  </span>

                  <h3 className="mt-4 font-[var(--font-poppins)] text-2xl font-bold text-[#1E293B]">
                    {item.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-[#0F766E]">

                    <MapPin size={18} />

                    <span className="text-sm font-medium">
                      Tour Activity
                    </span>

                  </div>

                  <p className="mt-4 leading-8 text-gray-600">
                    {item.description}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}