import * as React from "react";
import { cn } from "../../utils/cn";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: { value: string | number; label: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, children, options, ...props }, ref) => {
    const selectElement = (
      <select
        className={cn(
          "select select-bordered w-full h-11 rounded-xl bg-bg-start text-sm transition-all focus:border-primary",
          error && "select-error",
          className
        )}
        ref={ref}
        {...props}
      >
        {children || (
          <>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </>
        )}
      </select>
    );

    if (!label && !error) return selectElement;

    return (
      <div className="form-control w-full space-y-1.5">
        {label && (
          <label className="label-text pl-1 text-[10px] font-bold uppercase tracking-widest text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          {selectElement}
        </div>
        {error && (
          <span className="pl-1 text-[10px] font-bold text-danger animate-in fade-in slide-in-from-top-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };

