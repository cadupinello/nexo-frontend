import { Handle, Position, type NodeProps } from "@xyflow/react";
import { MessageSquare } from "lucide-react";
import { useFlowStore } from "../store/flow.store";

interface MessageNodeData {
  label: string;
  content?: string;
  isStart?: boolean;
  waitResponse?: boolean;
}

export function MessageNode({ id, data: rawData }: NodeProps) {
  const data = rawData as unknown as MessageNodeData;
  const activeNodeId = useFlowStore((state) => state.activeNodeId);
  const isActive = activeNodeId === id;

  return (
    <div
      className={`bg-panel border border-border-ui p-4 rounded-xl min-w-50 transition-all duration-500 ${isActive
        ? "ring-4 ring-primary shadow-[0_0_30px_rgba(20,184,166,0.4)] scale-105 z-50"
        : ""
        }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        id="target"
        className="w-3 h-3 bg-primary"
      />

      <div className="flex items-center justify-between mb-1">
        <div className="text-xs font-bold text-primary uppercase tracking-tight">
          {data.isStart ? "Fluxo inicial" : "Mensagem"}
        </div>
        {data.waitResponse && (
          <div className="flex items-center gap-1 text-[9px] font-black text-primary/60 bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">
            <MessageSquare size={10} />
            ESPERAR
          </div>
        )}
      </div>
      <div className="text-sm font-bold text-text-primary mb-1">
        {data.label}
      </div>
      {data.content && (
        <div className="text-[11px] text-text-secondary line-clamp-2 italic leading-tight">
          "{data.content}"
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        id="source"
        className="w-3 h-3 bg-primary"
      />
    </div>
  );
}
