import { RefreshCcw, Send, Terminal, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePostSession } from "../../../api/mutations/usePostSession";
import { useChatSession } from "../../chatBuilder/hooks/useChatSession";
import { useChatBuilderStore } from "../../chatBuilder/store/chat-builder-store";
import { useFlowStore } from "../store/flow.store";

interface SimulationChatProps {
  embedded?: boolean;
}

export function SimulationChat({ embedded = false }: SimulationChatProps) {
  const {
    simulationLogs,
    mode,
    waitingForResponse,
    addSimulationLog,
    setWaitingForResponse,
    setMode,
    selectedChatId,
    engineSource,
    currentSessionId,
    setCurrentSessionId,
  } = useFlowStore();

  const { sendMessage, isConnected } = useChatSession(selectedChatId);
  const { mutate: createSession, isPending: isCreatingSession } = usePostSession();
  const { chats, getActiveSettings } = useChatBuilderStore();

  // Criar sessão se estivermos no modo socket e não houver uma
  useEffect(() => {
    if (mode === "simulate" && engineSource === "socket" && selectedChatId && !currentSessionId && !isCreatingSession) {
      createSession({ chatId: selectedChatId }, {
        onSuccess: (session: any) => {
          setCurrentSessionId(session.id);
          console.log("[SIMULADOR] Sessão backend criada:", session.id);
        },
        onError: (error: any) => {
          console.error("[SIMULADOR] Erro ao criar sessão no backend:", error);
          addSimulationLog({
            type: "system",
            message: "Erro ao conectar com o servidor.",
          });
        }
      });
    }
  }, [mode, engineSource, selectedChatId, currentSessionId, createSession, setCurrentSessionId, isCreatingSession, addSimulationLog]);

  // Disparar o fluxo quando a sessão estiver pronta e conectada
  const hasStartedRef = useRef(false);
  useEffect(() => {
    if (engineSource === "socket" && currentSessionId && isConnected && !hasStartedRef.current) {
      hasStartedRef.current = true;
      console.log("[SIMULADOR] Iniciando fluxo no backend...");
      sendMessage("/start");
    }

    if (!currentSessionId) {
      hasStartedRef.current = false;
    }
  }, [engineSource, currentSessionId, isConnected, sendMessage]);

  const chatSettings = chats.find(c => c.id === selectedChatId) || getActiveSettings();
  const settings = chatSettings?.settings || (chatSettings as any);

  const {
    botName = "Assistant",
    headerBackgroundColor = "#3b82f6",
    headerTextColor = "#ffffff",
    userBubbleColor = "#3b82f6",
    botBubbleColor = "#f1f5f9",
    botTextColor = "#1e293b",
    mainColor = "#3b82f6"
  } = settings;

  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [simulationLogs]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const message = inputValue.trim();

    if (engineSource === "local") {
      // Lógica local (Mock)
      const currentStore = useFlowStore.getState();
      const activeNode = currentStore.nodes.find(n => n.id === currentStore.activeNodeId);

      if (activeNode?.data?.saveVariable) {
        currentStore.setSimulationVariable(activeNode.data.saveVariable as string, message);
      }

      addSimulationLog({
        type: "user",
        message: message,
      });

      setWaitingForResponse(false);
    } else {
      // Lógica Socket (Real)
      if (!isConnected) {
        console.error("Socket não está conectado!");
        return;
      }

      addSimulationLog({
        type: "user",
        message: message,
      });

      sendMessage(message);
    }

    setInputValue("");
  };

  const restartSimulation = () => {
    setMode("edit");
    setTimeout(() => setMode("simulate"), 50);
  };

  if (mode !== "simulate" && !embedded) return null;

  const containerClasses = embedded
    ? "flex-1 flex flex-col h-full bg-panel/30 border border-border-ui/50 rounded-3xl overflow-hidden shadow-inner"
    : "absolute right-6 bottom-6 w-96 h-[500px] bg-panel/95 backdrop-blur-2xl border border-border-ui rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-500";

  return (
    <div className={containerClasses}>
      {!embedded && (
        <div
          style={{ backgroundColor: headerBackgroundColor, color: headerTextColor }}
          className="p-5 border-b border-border-ui flex items-center justify-between shrink-0"
        >
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">
              {botName} • Simulação
            </h3>
          </div>
          <button
            onClick={restartSimulation}
            className="p-2 hover:bg-white/10 rounded-full transition-all"
          >
            <RefreshCcw size={14} />
          </button>
        </div>
      )}

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {simulationLogs.map((log) => (
          <div
            key={log.id}
            className={`flex flex-col gap-2 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 ${log.type === "system"
              ? "items-center"
              : log.type === "user"
                ? "items-end"
                : "items-start"
              }`}
          >
            {log.type === "system" ? (
              <div className="py-2 w-full flex items-center gap-4">
                <div className="h-px bg-border-ui flex-1 opacity-20" />
                <span className="text-[9px] text-text-secondary font-bold uppercase tracking-[0.2em] shrink-0 px-3 py-1 bg-white/5 rounded-full border border-border-ui/50">
                  {log.message}
                </span>
                <div className="h-px bg-border-ui flex-1 opacity-20" />
              </div>
            ) : (
              <div
                className={`flex gap-3 items-end max-w-[85%] ${log.type === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-xl shrink-0 border shadow-sm ${log.type === "user"
                    ? "bg-white/5 border-white/10 text-text-primary"
                    : log.type === "action"
                      ? "bg-info/20 text-info border-info/30"
                      : "bg-white/5 text-text-primary border-white/10"
                    }`}
                >
                  {log.type === "user" ? (
                    <User size={14} />
                  ) : log.type === "action" ? (
                    <Terminal size={14} />
                  ) : (
                    <div
                      style={{ backgroundColor: mainColor }}
                      className="w-4 h-4 rounded-full opacity-60"
                    />
                  )}
                </div>
                <div
                  style={
                    log.type === "user"
                      ? { backgroundColor: userBubbleColor, color: "#fff" }
                      : log.type === "message"
                        ? { backgroundColor: botBubbleColor, color: botTextColor }
                        : {}
                  }
                  className={`p-4 rounded-2xl text-[13px] leading-relaxed break-words border border-transparent shadow-sm ${log.type === "user"
                    ? "rounded-br-none font-medium"
                    : log.type === "action"
                      ? "bg-info/10 border-info/10 text-info"
                      : "rounded-bl-none"
                    }`}
                >
                  {log.message}
                </div>
              </div>
            )}
          </div>
        ))}
        {waitingForResponse && (
          <div className="flex gap-1.5 items-center px-2 animate-pulse">
            <div style={{ backgroundColor: mainColor }} className="w-1.5 h-1.5 rounded-full shadow-[0_0_5px_var(--color-primary)] opacity-60" />
            <div style={{ backgroundColor: mainColor }} className="w-1.5 h-1.5 rounded-full [animation-delay:200ms] shadow-[0_0_5px_var(--color-primary)] opacity-60" />
            <div style={{ backgroundColor: mainColor }} className="w-1.5 h-1.5 rounded-full [animation-delay:400ms] shadow-[0_0_5px_var(--color-primary)] opacity-60" />
          </div>
        )}
      </div>

      <div
        className={`p-6 border-t border-border-ui shrink-0 ${embedded ? "bg-black/20" : "bg-white/5"}`}
      >
        <form onSubmit={handleSend} className="max-w-xl mx-auto flex gap-3">
          <input
            disabled={engineSource === "local" ? !waitingForResponse : !isConnected}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              engineSource === "socket"
                ? (isConnected ? "Digite uma mensagem (Live)..." : "Socket desconectado...")
                : (waitingForResponse ? "Digite uma mensagem..." : "Aguardando bot...")
            }
            className="flex-1 bg-bg-start border border-border-ui rounded-2xl px-5 py-3 text-sm text-text-primary focus:border-primary outline-none transition-all placeholder:text-text-secondary/30 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={engineSource === "local" ? !waitingForResponse : !isConnected}
            style={{ backgroundColor: (engineSource === "local" ? waitingForResponse : isConnected) ? mainColor : undefined }}
            className="w-12 h-12 text-white rounded-2xl flex items-center justify-center hover:opacity-90 transition-all shadow-lg active:scale-95 disabled:grayscale disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
