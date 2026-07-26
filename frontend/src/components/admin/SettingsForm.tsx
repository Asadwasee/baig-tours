"use client";

export default function SettingsForm() {
  return (
    <form className="space-y-6 rounded-xl bg-white p-6 shadow">

      <div>
        <label className="mb-2 block font-medium">
          Website Name
        </label>

        <input
          type="text"
          defaultValue="Baig Tours"
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Contact Email
        </label>

        <input
          type="email"
          defaultValue="info@baigtours.com"
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Contact Number
        </label>

        <input
          type="text"
          defaultValue="+92 300 1234567"
          className="w-full rounded-lg border p-3"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600"
      >
        Save Settings
      </button>

    </form>
  );
}