import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";
import { Header } from "../../shared/components/layout/Header";
import { Button } from "../../shared/components/ui/Button";

export const Route = createFileRoute("/_app/")({
  component: IndexComponent,
});

function IndexComponent() {
  const showToast = () => {
    toast.success("Sonner está funcionando!", {
      description: "Esta é uma notificação de sucesso configurada corretamente.",
    });
  };

  return (
    <div className="flex flex-col h-full bg-bg-end/30">
      <Header
        title="Dashboard"
        subtitle="Bem-vindo ao futuro da automação"
      />

      <div className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* DaisyUI Test Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-panel border border-border-ui shadow-xl">
            <div className="card-body p-6">
              <h2 className="card-title text-text-primary flex items-center gap-2">
                <Zap className="text-primary" size={20} />
                DaisyUI Card
              </h2>
              <p className="text-sm text-text-secondary opacity-70">
                Este card está usando o sistema de classes do DaisyUI v5.
              </p>
              <div className="card-actions justify-end mt-4">
                <div className="badge badge-primary">V5 Ativo</div>
                <div className="badge badge-outline text-text-secondary">Tailwind 4</div>
              </div>
            </div>
          </div>

          <div className="card bg-panel border border-border-ui shadow-xl">
            <div className="card-body p-6 text-center">
              <div className="avatar placeholder mb-4 justify-center">
                <div className="bg-primary/20 text-primary rounded-xl w-16">
                  <Sparkles size={32} />
                </div>
              </div>
              <h2 className="text-lg font-bold text-text-primary">Notificações</h2>
              <p className="text-sm text-text-secondary opacity-70 mb-4">
                Clique abaixo para testar o sistema de toast do Sonner.
              </p>
              <Button onClick={showToast} variant="primary" size="sm" className="w-full">
                Disparar Toast
              </Button>
            </div>
          </div>

          <div className="card bg-panel border border-border-ui shadow-xl">
            <div className="card-body p-6">
              <h2 className="card-title text-text-primary flex items-center gap-2">
                <MessageSquare className="text-info" size={20} />
                Progresso
              </h2>
              <p className="text-xs text-text-secondary mb-2">Build Status</p>
              <progress className="progress progress-primary w-full" value="70" max="100"></progress>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[10px] uppercase font-black text-text-secondary tracking-widest">
                  Performance
                </span>
                <span className="text-xs font-bold text-primary">Excelente</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions / Info */}
        <div className="bg-panel/40 border border-border-ui rounded-[32px] p-8">
          <h3 className="text-xl font-bold text-text-primary mb-6">Próximos Passos (Refatoração)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Login", status: "Pendente", color: "bg-warning" },
              { label: "Properties", status: "Pendente", color: "bg-warning" },
              { label: "Settings", status: "Pendente", color: "bg-warning" },
              { label: "Integrations", status: "Pendente", color: "bg-warning" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className={`w-2 h-10 ${item.color} rounded-full`} />
                <div>
                  <h4 className="text-sm font-bold text-text-primary">{item.label}</h4>
                  <p className="text-[10px] uppercase font-black text-text-secondary tracking-tighter">
                    {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
