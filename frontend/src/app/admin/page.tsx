import Link from "next/link";

const adminCards = [
  {
    title: "Booking Management",
    description: "Review, update, export, and print booking vouchers.",
    href: "/admin/bookings",
  },
];

export default function AdminDashboardPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
          Admin Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Operations Center</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-4 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
              Admin
            </div>
            <h2 className="text-xl font-semibold text-slate-900">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
