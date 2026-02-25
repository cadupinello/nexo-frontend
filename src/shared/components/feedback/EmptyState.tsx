import { Inbox, Plus } from "lucide-react";
import { cn } from "../../utils/cn";

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  message,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700", className)}>
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-panel border-2 border-border-ui/50 text-text-secondary/30 shadow-xl">
        <Icon size={40} strokeWidth={1.5} />
      </div>

      <h3 className="mb-2 text-lg font-bold tracking-tight text-text-primary">
        {title}
      </h3>
      <p className="mb-8 max-w-[240px] text-xs leading-relaxed text-text-secondary opacity-70">
        {message}
      </p>

      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="btn btn-primary btn-sm h-11 gap-2 rounded-xl px-6 font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={18} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
