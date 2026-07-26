import SettingsForm from "@/components/admin/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Website Settings
      </h1>

      <SettingsForm />

    </div>
  );
}