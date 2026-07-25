import { PlayCircle } from "lucide-react";

export default function VideosSection() {
  return (
    <section className="bg-white py-16">

      <div className="container-custom">

        {/* Heading */}

        <div className="mb-12">

          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            Travel Videos
          </span>

          <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            Experience The Journey
          </h2>

          <p className="mt-4 max-w-3xl text-gray-600">
            Watch highlights from previous tours and discover what makes this
            adventure unforgettable.
          </p>

        </div>

        {/* Videos */}

        <div className="grid gap-8 lg:grid-cols-2">

          <div className="overflow-hidden rounded-3xl shadow-lg">

            <div className="aspect-video">

              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/Scxs7L0vhZ4"
                title="Tour Video"
                allowFullScreen
              />

            </div>

          </div>

          <div className="overflow-hidden rounded-3xl shadow-lg">

            <div className="aspect-video">

              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/aqz-KE-bpKQ"
                title="Tour Video"
                allowFullScreen
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}