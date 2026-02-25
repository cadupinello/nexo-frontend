import { type Node } from "@xyflow/react";
import { GitGraph, Loader2, Play, Save } from "lucide-react";
import { useEffect, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

import { useNavigate } from "@tanstack/react-router";
import { usePutFlow } from "../../api/mutations/usePutFlow";
import { useGetChats } from "../../api/queries/useGetChats";
import { useGetFlow } from "../../api/queries/useGetFlow";
import { FlowCanvas } from "../../features/flow/FlowCanvas";
import { INITIAL_NODES, useFlowStore } from "../../features/flow/store/flow.store";
import { useWorkspaceStore } from "../../features/workspaces/store/workspace-store";
import { Header } from "../../shared/components/layout/Header";

export const Route = createFileRoute("/_app/flow-builder")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { activeWorkspaceId } = useWorkspaceStore();
  const { data: chats } = useGetChats(activeWorkspaceId || undefined);

  const {
    flowName,
    flowSuffix,
    setFlowName,
    setFlowSuffix,
    nodes,
    edges,
    setNodes,
    setEdges,
    selectedChatId,
    setSelectedChatId,
    updateNodeData,
  } = useFlowStore();

  const { data: remoteFlow, isLoading: loadingFlow } = useGetFlow(
    selectedChatId || "",
  );
  const { mutate: saveFlow, isPending: isSaving } = usePutFlow();

  useEffect(() => {
    if (remoteFlow && selectedChatId && chats) {
      const selectedChat = chats.find((c) => c.id === selectedChatId);

      let flowNodes = (remoteFlow.nodes && remoteFlow.nodes.length > 0)
        ? remoteFlow.nodes
        : INITIAL_NODES;

      if (!remoteFlow.nodes || remoteFlow.nodes.length === 0) {
        flowNodes = flowNodes.map((node: Node) =>
          node.type === "start"
            ? { ...node, data: { ...node.data, label: selectedChat?.settings?.welcomeMessage || node.data.label } }
            : node
        );
      }

      setNodes(flowNodes);
      setEdges(remoteFlow.edges || []);
    }
  }, [remoteFlow, selectedChatId, chats, setNodes, setEdges]);

  useEffect(() => {
    if (selectedChatId && chats) {
      const selectedChat = chats.find((c) => c.id === selectedChatId);
      if (selectedChat) {
        const startNode = nodes.find((n: Node) => n.type === "start");
        if (startNode && startNode.data.label !== selectedChat.settings.welcomeMessage) {
          updateNodeData(startNode.id, { label: selectedChat.settings.welcomeMessage });
        }
      }
    }
  }, [selectedChatId, chats, nodes, updateNodeData]);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingSuffix, setIsEditingSuffix] = useState(false);

  const handleStartSimulation = () => {
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
        <p className="font-bold">
          Selecione um Workspace para gerenciar fluxos
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <Header
        title={
          isEditingName ? (
            <input
              autoFocus
              className="input input-ghost h-auto min-w-25 p-0 text-base font-bold text-text-primary focus:bg-transparent focus:text-primary outline-none"
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
            />
          ) : (
            <span
              onClick={() => setIsEditingName(true)}
              className="cursor-pointer transition-colors hover:text-primary"
            >
              {flowName}
            </span>
          )
        }
        subtitle={
          isEditingSuffix ? (
            <input
              autoFocus
              className="input input-ghost h-auto p-0 text-[10px] font-semibold uppercase tracking-widest text-text-secondary focus:bg-transparent focus:text-primary outline-none"
              value={flowSuffix}
              onChange={(e) => setFlowSuffix(e.target.value)}
              onBlur={() => setIsEditingSuffix(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingSuffix(false)}
            />
          ) : (
            <span
              onClick={() => setIsEditingSuffix(true)}
              className="cursor-pointer uppercase transition-colors hover:text-primary"
            >
              {flowSuffix}
            </span>
          )
        }
        actions={
          <div className="flex items-center gap-3">
            <div className="join border border-border-ui bg-panel">
              <div className="join-item flex items-center bg-white/5 px-3 border-r border-border-ui">
                <span className="text-[10px] font-bold uppercase tracking-tighter text-text-secondary">
                  Chat:
                </span>
              </div>
              <select
                value={selectedChatId || ""}
                onChange={(e) => setSelectedChatId(e.target.value)}
                className="select join-item select-ghost select-sm h-9 min-w-30 text-xs font-medium focus:bg-transparent"
              >
                <option value="">Selecione...</option>
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
              className="btn btn-outline btn-sm h-9 gap-2 border-border-ui bg-panel px-4 font-bold text-text-primary hover:bg-panel-hover"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Salvar
            </button>

            <button
              onClick={handleStartSimulation}
              disabled={!selectedChatId}
              className="btn btn-primary btn-sm h-9 gap-2 px-4 font-bold shadow-lg shadow-primary/20"
            >
              <Play size={16} fill="currentColor" />
              Simular
            </button>
          </div>
        }
      />
      <div className="relative flex-1">
        {loadingFlow && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-bg-start/50">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        )}
        <FlowCanvas />
      </div>
    </div>
  );
}
