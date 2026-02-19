import { GitGraph, Loader2, Play, Save } from "lucide-react";
import { useEffect, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

import { useNavigate } from "@tanstack/react-router";
import { usePutFlow } from "../../api/mutations/usePutFlow";
import { useGetChats } from "../../api/queries/useGetChats";
import { useGetFlow } from "../../api/queries/useGetFlow";
import { FlowCanvas } from "../../features/flow/FlowCanvas";
import { useFlowStore } from "../../features/flow/store/flow.store";
import { useWorkspaceStore } from "../../features/workspaces/store/workspace-store";
import { Header } from "../../shared/components/layout/Header";

export const Route = createFileRoute("/_app/flow-builder")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { activeWorkspaceId } = useWorkspaceStore()
  const { data: chats } = useGetChats(activeWorkspaceId || undefined)

  const {
    flowName,
    flowSuffix,
    setFlowName,
    setFlowSuffix,
    nodes,
    edges,
    setNodes,
    setEdges,
    setActiveNodeId,
    selectedChatId,
    setSelectedChatId,
  } = useFlowStore();

  const { data: remoteFlow, isLoading: loadingFlow } = useGetFlow(selectedChatId || "");
  const { mutate: saveFlow, isPending: isSaving } = usePutFlow();

  // Sync with remote flow when loaded
  useEffect(() => {
    if (remoteFlow && selectedChatId) {
      setNodes(remoteFlow.nodes || []);
      setEdges(remoteFlow.edges || []);
    }
  }, [remoteFlow, selectedChatId, setNodes, setEdges]);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingSuffix, setIsEditingSuffix] = useState(false);
  const [startAtNodeId, setStartAtNodeId] = useState<string>("");

  const handleStartSimulation = () => {
    if (startAtNodeId) {
      setActiveNodeId(startAtNodeId);
    }
    navigate({ to: "/simulate" });
  };

  const handleSave = () => {
    if (selectedChatId) {
      saveFlow({ chatId: selectedChatId, nodes, edges });
    }
  };

  if (!activeWorkspaceId) {
    return (
      <div className="flex flex-col h-full items-center justify-center gap-4 text-text-secondary">
        <GitGraph size={48} />
        <p className="font-bold">Selecione um Workspace para gerenciar fluxos</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <Header
        title={
          isEditingName ? (
            <input
              autoFocus
              className="bg-transparent border-none outline-none font-bold text-base text-text-primary focus:ring-0 p-0 w-auto min-w-25"
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
            />
          ) : (
            <span
              onClick={() => setIsEditingName(true)}
              className="cursor-pointer hover:text-primary transition-colors"
            >
              {flowName}
            </span>
          )
        }
        subtitle={
          isEditingSuffix ? (
            <input
              autoFocus
              className="bg-transparent border-none outline-none font-semibold text-[10px] text-text-secondary uppercase tracking-widest focus:ring-0 p-0 w-auto"
              value={flowSuffix}
              onChange={(e) => setFlowSuffix(e.target.value)}
              onBlur={() => setIsEditingSuffix(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingSuffix(false)}
            />
          ) : (
            <span
              onClick={() => setIsEditingSuffix(true)}
              className="cursor-pointer hover:text-primary transition-colors uppercase"
            >
              {flowSuffix}
            </span>
          )
        }
        tools={<></>}
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-panel border border-border-ui rounded-lg overflow-hidden h-9">
              <div className="px-3 border-r border-border-ui h-full flex items-center bg-white/5">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-tighter">
                  Vincular ao Chat:
                </span>
              </div>
              <select
                value={selectedChatId || ""}
                onChange={(e) => setSelectedChatId(e.target.value)}
                className="bg-transparent border-none outline-none text-xs font-medium px-2 py-1 pr-8 text-text-primary appearance-none cursor-pointer hover:bg-white/5 transition-colors h-full min-w-30"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 8px center",
                  backgroundSize: "12px",
                }}
              >
                <option value="">Selecione um chat...</option>
                {chats?.map((chat) => (
                  <option key={chat.id} value={chat.id}>
                    {chat.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving || !selectedChatId}
              className="flex items-center gap-2 px-4 py-2 bg-panel border border-border-ui text-text-primary text-sm font-bold rounded-lg hover:bg-panel-hover transition-all h-9 disabled:opacity-50"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Salvar
            </button>

            <button
              onClick={handleStartSimulation}
              disabled={!selectedChatId}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold border border-primary/20 rounded-lg hover:brightness-110 shadow-lg shadow-primary/20 transition-all h-9 disabled:opacity-50"
            >
              <Play size={16} fill="currentColor" />
              Simular
            </button>
          </div>
        }
      />
      <div className="flex-1 relative">
        {loadingFlow ? (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-start/50 z-50">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : null}
        <FlowCanvas />
      </div>
    </div>
  );
}
