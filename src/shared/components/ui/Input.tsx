import * as React from "react";
import { cn } from "../../utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full relative group">
        {label && (
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest pl-1">
            {label}
          </label>
        )}
        <div className="relative">
          {icon}
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-xl border border-border-ui bg-bg-start px-4 py-2 text-sm text-text-primary shadow-sm transition-all placeholder:text-text-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-danger focus:border-danger focus:ring-danger",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <span className="text-[10px] font-bold text-danger pl-1 animate-in fade-in slide-in-from-top-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };

