import { InputHTMLAttributes } from "react";

export function Field({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13.5px] font-medium text-ink-soft">
        {label}
      </span>
      <input
        className="w-full rounded-lg border border-line bg-paper-raised px-3.5 py-2.5 text-[14.5px] outline-none placeholder:text-muted focus:border-emerald focus:ring-2 focus:ring-emerald/15"
        {...props}
      />
    </label>
  );
}
