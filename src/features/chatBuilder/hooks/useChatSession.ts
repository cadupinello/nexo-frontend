import { useCallback, useEffect } from "react";
import { useSocket } from "../../../shared/contexts/SocketContext";
import { useFlowStore } from "../../flow/store/flow.store";

export const useChatSession = (chatId: string | null) => {
  const { socket, isConnected } = useSocket();
  const { 
    addSimulationLog, 
    setWaitingForResponse, 
    currentSessionId 
  } = useFlowStore();
  
  useEffect(() => {
    if (!socket || !isConnected || !chatId || !currentSessionId) return;

    // Entrar na sala do chat específico para simulação usando chatId e sessionId
    socket.emit("join_simulation", { 
      chatId, 
      sessionId: currentSessionId 
    });

    const handleBotMessage = (message: any) => {
      console.log("[SOCKET] Mensagem do bot recebida:", message);
      
      const content = message.content || message.message || message.text;
      if (!content) return;

      addSimulationLog({
        type: "message",
        message: content,
        nodeId: message.nodeId,
      });
      setWaitingForResponse(true);
    };

    const handleBotAction = (action: any) => {
      console.log("[SOCKET] Ação do bot recebida:", action);
      addSimulationLog({
        type: "action",
        message: `Executando: ${action.name || action.label || "Ação"}`,
      });
    };

    socket.on("bot_message", handleBotMessage);
    socket.on("message", handleBotMessage); // Tenta também o evento 'message' genérico
    socket.on("bot_action", handleBotAction);

    return () => {
      socket.off("bot_message", handleBotMessage);
      socket.off("message", handleBotMessage);
      socket.off("bot_action", handleBotAction);
      socket.emit("leave_simulation", { chatId, sessionId: currentSessionId });
    };
  }, [socket, isConnected, chatId, addSimulationLog, setWaitingForResponse, currentSessionId]);

  const sendMessage = useCallback((message: string) => {
    if (socket && isConnected && chatId && currentSessionId) {
      // O usuário mencionou que o evento deve ser 'message'
      socket.emit("message", { 
        chatId, 
        sessionId: currentSessionId,
        content: message 
      });
      setWaitingForResponse(false);
    }
  }, [socket, isConnected, chatId, setWaitingForResponse, currentSessionId]);

  return {
    sendMessage,
    isConnected,
  };
};
