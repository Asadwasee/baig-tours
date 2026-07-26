import Image from "next/image";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Ahmed Khan",
    city: "Islamabad",
    image: "/assets/images/testimonials/user1.jpg",
    rating: 5,
    review:
      "Absolutely amazing experience! Everything was perfectly organized. The hotels, transport, and guide exceeded our expectations. Highly recommended.",
  },
  {
    id: 2,
    name: "Fatima Ali",
    city: "Lahore",
    image: "/assets/images/testimonials/user2.jpg",
    rating: 5,
    review:
      "Hunza has always been my dream destination and Baig Tours made it unforgettable. The itinerary was well planned and the team was very cooperative.",
  },
  {
    id: 3,
    name: "Usman Tariq",
    city: "Karachi",
    image: "/assets/images/testimonials/user3.jpg",
    rating: 4,
    review:
      "Excellent service with comfortable transport and quality hotels. Would definitely book another trip with Baig Tours.",
  },
];

export default function ReviewsSection() {
  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="container-custom">

        {/* Section Heading */}

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <span className="font-semibold uppercase tracking-[0.18em] text-[#F97316]">
            Traveler Reviews
          </span>

          <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            Loved By Our Travelers
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            Every journey creates lasting memories. Here's what our happy
            travelers have to say about their Baig Tours experience.
          </p>

        </div>

        {/* Overall Rating */}

        <div className="mb-16 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">

            {/* Left */}

            <div className="text-center lg:text-left">

              <div className="flex items-center justify-center gap-4 lg:justify-start">

                <h3 className="font-[var(--font-poppins)] text-5xl font-bold text-[#0F766E]">
                  4.9
                </h3>

                <div>

                  <div className="flex gap-1">

                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        fill="#FBBF24"
                        className="text-[#FBBF24]"
                      />
                    ))}

                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    1,250+ Verified Reviews
                  </p>

                </div>

              </div>

            </div>

            {/* Rating Distribution */}

            <div className="w-full max-w-md space-y-3">

              <RatingRow stars={5} percentage={92} />
              <RatingRow stars={4} percentage={6} />
              <RatingRow stars={3} percentage={2} />
              <RatingRow stars={2} percentage={1} />
              <RatingRow stars={1} percentage={0} />

            </div>

          </div>

        </div>

        {/* Review Cards */}

        <div className="grid gap-8 lg:grid-cols-3">

          {reviews.map((review) => (

            <article
              key={review.id}
              className="rounded-3xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E]/30 hover:shadow-lg"
            >

              {/* User */}

              <div className="flex items-center gap-4">

                <Image
                  src={review.image}
                  alt={review.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />

                <div>

                  <h3 className="font-semibold text-[#1E293B]">
                    {review.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {review.city}
                  </p>

                </div>

              </div>

              {/* Rating */}

              <div className="mt-5 flex gap-1">

                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={17}
                    fill="#FBBF24"
                    className="text-[#FBBF24]"
                  />
                ))}

              </div>

              {/* Review */}

              <p className="mt-5 leading-7 text-gray-600">
                "{review.review}"
              </p>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
}

function RatingRow({
  stars,
  percentage,
}: {
  stars: number;
  percentage: number;
}) {
  return (
    <div className="flex items-center gap-4">

      <span className="w-8 text-sm font-medium text-[#1E293B]">
        {stars}★
      </span>

      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">

        <div
          className="h-full rounded-full bg-[#FBBF24]"
          style={{ width: `${percentage}%` }}
        />

      </div>

      <span className="w-10 text-right text-sm text-gray-500">
        {percentage}%
      </span>

    </div>
  );
}