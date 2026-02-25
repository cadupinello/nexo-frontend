import { AlertTriangle, RefreshCcw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Ops! Algo deu errado",
  message = "Não foi possível carregar os dados. Por favor, tente novamente.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex h-full min-h-[400px] w-full flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-ping rounded-full bg-danger/20" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-danger/10 text-danger shadow-2xl shadow-danger/20">
          <AlertTriangle size={40} />
        </div>
      </div>

      <h3 className="mb-2 text-xl font-black tracking-tight text-text-primary">
        {title}
      </h3>
      <p className="mb-8 max-w-xs text-sm leading-relaxed text-text-secondary">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-primary gap-2 rounded-xl px-8 shadow-lg shadow-primary/20"
        >
          <RefreshCcw size={18} />
          Tentar Novamente
        </button>
      )}
    </div>
  );
}
