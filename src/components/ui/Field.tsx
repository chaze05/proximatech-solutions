"use client";

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  as?: "input" | "textarea";
  rows?: number;
  autoComplete?: string;
};

const inputClasses =
  "w-full rounded-xl border border-white/12 bg-panel px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors duration-200 focus:border-signal focus:outline-none";

export function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required,
  as = "input",
  rows = 5,
  autoComplete,
}: FieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-bold uppercase tracking-[0.16em] text-secondary"
      >
        {label}
        {required ? <span className="text-signal-light"> *</span> : null}
      </label>

      {as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={inputClasses}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          autoComplete={autoComplete}
          className={inputClasses}
        />
      )}

      {error ? (
        <p id={errorId} role="alert" className="text-xs text-signal-hover">
          {error}
        </p>
      ) : null}
    </div>
  );
}
