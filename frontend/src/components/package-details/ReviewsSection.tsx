import Image from "next/image";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Ahmed Khan",
    city: "Islamabad",
    image: "/assets/testimonials/user1.jpg",
    rating: 5,
    review:
      "Absolutely amazing experience! Everything was perfectly organized. The hotels, transport, and guide exceeded our expectations. Highly recommended.",
  },
  {
    id: 2,
    name: "Fatima Ali",
    city: "Lahore",
    image: "/assets/testimonials/user2.jpg",
    rating: 5,
    review:
      "Hunza has always been my dream destination and Baig Tours made it unforgettable. The itinerary was well planned and the team was very cooperative.",
  },
  {
    id: 3,
    name: "Usman Tariq",
    city: "Karachi",
    image: "/assets/testimonials/user3.jpg",
    rating: 4,
    review:
      "Excellent service with comfortable transport and quality hotels. Would definitely book another trip with Baig Tours.",
  },
];

export default function ReviewsSection() {
  return (
    <section className="bg-white py-16">

      <div className="container-custom">

        {/* Header */}

        <div className="mb-14 text-center">

          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            Customer Reviews
          </span>

          <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            What Our Travelers Say
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-gray-600">
            Thousands of travelers have explored Pakistan and international
            destinations with Baig Tours. Here's what some of our happy
            customers have to say.
          </p>

        </div>

        {/* Overall Rating */}

        <div className="mb-14 rounded-3xl bg-[#F8FAFC] p-8 shadow-md">

          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

            <div>

              <h3 className="font-[var(--font-poppins)] text-5xl font-bold text-[#0F766E]">
                4.9
              </h3>

              <div className="mt-3 flex gap-1">

                {[1,2,3,4,5].map((star)=>(
                  <Star
                    key={star}
                    size={22}
                    fill="#FBBF24"
                    className="text-[#FBBF24]"
                  />
                ))}

              </div>

              <p className="mt-3 text-gray-500">
                Based on 1,250+ verified reviews
              </p>

            </div>

            <div className="grid gap-3 text-sm">

              <RatingRow stars={5} percentage={92}/>
              <RatingRow stars={4} percentage={6}/>
              <RatingRow stars={3} percentage={2}/>
              <RatingRow stars={2} percentage={1}/>
              <RatingRow stars={1} percentage={0}/>

            </div>

          </div>

        </div>

        {/* Reviews */}

        <div className="grid gap-8 lg:grid-cols-3">

          {reviews.map((review)=>(

            <article
              key={review.id}
              className="rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

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

              <div className="mt-5 flex gap-1">

                {Array.from({length:review.rating}).map((_,i)=>(
                  <Star
                    key={i}
                    size={18}
                    fill="#FBBF24"
                    className="text-[#FBBF24]"
                  />
                ))}

              </div>

              <p className="mt-5 leading-7 text-gray-600">
                {review.review}
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
}:{
  stars:number;
  percentage:number;
}){

  return(

    <div className="flex items-center gap-4">

      <span className="w-8 font-medium">
        {stars}★
      </span>

      <div className="h-2 w-56 overflow-hidden rounded-full bg-gray-200">

        <div
          className="h-full rounded-full bg-[#FBBF24]"
          style={{width:`${percentage}%`}}
        />

      </div>

      <span className="w-8 text-sm text-gray-500">
        {percentage}%
      </span>

    </div>

  );
}