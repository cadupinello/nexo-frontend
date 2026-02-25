import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export function LoadingSpinner({ size = 24, className, ...props }: SpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <Loader2 size={size} className="animate-spin text-primary" />
    </div>
  );
}
