"use client";

import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8 shadow-sm">

      <div>

        <h2 className="text-2xl font-bold text-slate-800">
          Admin Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          Welcome back!
        </p>

      </div>

      <div className="flex items-center gap-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="rounded-xl border py-2 pl-10 pr-4 outline-none focus:border-[#F97316]"
          />

        </div>

        <button className="relative rounded-xl bg-slate-100 p-3">

          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

        </button>

        <div className="flex items-center gap-3">

          <UserCircle2
            size={42}
            className="text-[#0B5C56]"
          />

          <div>

            <p className="font-semibold">
              Admin
            </p>

            <p className="text-sm text-gray-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}