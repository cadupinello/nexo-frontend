import { Building2, ChevronDown, Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { usePostWorkspace } from "../../../api/mutations/usePostWorkspace";
import { useGetWorkspaces, type Workspace } from "../../../api/queries/useGetWorkspaces";
import { useWorkspaceStore } from "../store/workspace-store";

export function WorkspaceSelector() {
  const { data: workspaces, isLoading } = useGetWorkspaces();
  const { mutate: createWorkspace, isPending: isCreating } = usePostWorkspace();
  const { activeWorkspaceId, setActiveWorkspaceId, setWorkspaces } = useWorkspaceStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (workspaces) {
      setWorkspaces(workspaces);
      if (!activeWorkspaceId && workspaces.length > 0) {
        setActiveWorkspaceId(workspaces[0].id);
      }
    }
  }, [workspaces, activeWorkspaceId, setActiveWorkspaceId, setWorkspaces]);

  const activeWorkspace = workspaces?.find((w) => w.id === activeWorkspaceId);

  const handleCreate = () => {
    const name = prompt("Nome do novo Workspace:");
    if (name) {
      createWorkspace(name, {
        onSuccess: (newWs: Workspace) => {
          setActiveWorkspaceId(newWs.id);
        },
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-panel/40 border border-border-ui p-4 rounded-xl flex flex-col gap-1 hover:bg-panel/60 transition-all text-left cursor-pointer group"
      >
        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest flex items-center justify-between">
          Workspace
          <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </span>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-text-primary truncate">
            {isLoading ? "Carregando..." : activeWorkspace?.name || "Nenhum selecionado"}
          </span>
          {activeWorkspace && (
            <span className="bg-primary/10 text-primary text-[9px] font-bold px-1.5 py-0.5 rounded border border-primary/20">
              FREE
            </span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 w-full mb-2 bg-panel border border-border-ui rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2">
          <div className="max-h-48 overflow-y-auto p-1">
            {workspaces?.map((ws) => (
              <button
                key={ws.id}
                onClick={() => {
                  setActiveWorkspaceId(ws.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${activeWorkspaceId === ws.id
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                  }`}
              >
                <Building2 size={14} />
                <span className="truncate">{ws.name}</span>
              </button>
            ))}
          </div>
          <button
            onClick={handleCreate}
            disabled={isCreating}
            className="w-full flex items-center gap-2 px-3 py-3 border-t border-border-ui text-[10px] font-bold text-text-primary hover:bg-primary hover:text-white transition-all group"
          >
            {isCreating ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            CRIAR NOVO WORKSPACE
          </button>
        </div>
      )}
    </div>
  );
}
