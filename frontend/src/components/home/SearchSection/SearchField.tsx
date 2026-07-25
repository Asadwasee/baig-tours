import { SearchOption } from "@/types/search";

interface SearchFieldProps {
  label: string;
  options: SearchOption[];

  value: string;
  onChange: (value: string) => void;
}

export default function SearchField({
  label,
  options,
  value,
  onChange,
}: SearchFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#1E293B]">
        {label}
      </label>

      <select 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#1E293B] transition focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20">
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}