import { LoadingSpinner } from "../ui/LoadingSpinner";

interface LoadingOverlayProps {
  message?: string;
  blur?: boolean;
}

export function LoadingOverlay({ message = "Carregando...", blur = true }: LoadingOverlayProps) {
  return (
    <div className={`absolute inset-0 z-[100] flex flex-col items-center justify-center gap-4 ${blur ? 'backdrop-blur-sm bg-bg-start/40' : 'bg-bg-start/10'}`}>
      <div className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-panel border border-border-ui shadow-2xl animate-in zoom-in-95 duration-300">
        <LoadingSpinner size={32} />
        {message && (
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-primary animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
