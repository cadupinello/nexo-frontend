import * as React from "react";
import { cn } from "../../utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest pl-1">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-xl border border-border-ui bg-bg-start px-4 py-3 text-sm text-text-primary shadow-sm transition-all placeholder:text-text-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none",
            error && "border-danger focus:border-danger focus:ring-danger",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="text-[10px] font-bold text-danger pl-1 animate-in fade-in slide-in-from-top-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
