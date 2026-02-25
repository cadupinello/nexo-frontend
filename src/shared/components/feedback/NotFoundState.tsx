import { useNavigate } from "@tanstack/react-router";
import { Home, Search } from "lucide-react";

export function NotFoundState() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full min-h-[400px] w-full flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="relative mb-8">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/5 text-primary shadow-inner">
          <Search size={64} className="opacity-20" />
        </div>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-black tracking-tighter text-primary">
          404
        </span>
      </div>

      <h3 className="mb-2 text-2xl font-black tracking-tight text-text-primary uppercase">
        Página não encontrada
      </h3>
      <p className="mb-10 max-w-sm text-sm leading-relaxed text-text-secondary">
        O link que você seguiu pode estar quebrado ou a página pode ter sido removida.
      </p>

      <button
        onClick={() => navigate({ to: "/" })}
        className="btn btn-ghost gap-2 rounded-xl border border-border-ui bg-panel px-8 text-text-primary hover:bg-white/5 active:scale-95 transition-all"
      >
        <Home size={18} />
        Voltar ao início
      </button>
    </div>
  );
}
