import { createFileRoute } from "@tanstack/react-router";
import { Loader2, MessageSquareOff, Plus } from "lucide-react";
import { useEffect } from "react";
import { usePostChat } from "../../api/mutations/usePostChat";
import { useGetChats } from "../../api/queries/useGetChats";
import { SettingsPanel } from "../../features/chatBuilder/components/SettingsPanel";
import { WidgetPreview } from "../../features/chatBuilder/components/WidgetPreview";
import { useChatBuilderStore } from "../../features/chatBuilder/store/chat-builder-store";
import { useWorkspaceStore } from "../../features/workspaces/store/workspace-store";
import { Header } from "../../shared/components/layout/Header";
import { Select } from "../../shared/components/ui/Select";

export const Route = createFileRoute("/_app/chat-builder")({
  component: RouteComponent,
});

function RouteComponent() {
  const { activeWorkspaceId } = useWorkspaceStore();
  const { data: chats, isLoading } = useGetChats(
    activeWorkspaceId || undefined,
  );
  const { mutate: createChat, isPending: isCreating } = usePostChat();
  const { activeChatId, setActiveChat, setFullSettings } =
    useChatBuilderStore();

  useEffect(() => {
    if (chats && chats.length > 0) {
      if (!activeChatId || !chats.find((c) => c.id === activeChatId)) {
        setActiveChat(chats[0].id);
      }

      const activeChat = chats.find((c: any) => c.id === activeChatId);
      if (activeChat) {

        setFullSettings(activeChat.id, {
          id: activeChat.id,
          name: activeChat.name,
          settings: activeChat.settings || {},
        } as any);
      }
    }
  }, [chats, activeChatId, setActiveChat, setFullSettings]);

  const handleCreateChat = () => {
    const name = prompt("Nome do novo chat:");
    if (name && activeWorkspaceId) {
      createChat(
        { name, workspaceId: activeWorkspaceId },
        {
          onSuccess: (newChat) => {
            setActiveChat(newChat.id);
          },
        },
      );
    }
  };

  if (!activeWorkspaceId) {
    return (
      <div className="flex flex-col h-full items-center justify-center gap-4 text-text-secondary">
        <MessageSquareOff size={48} />
        <p className="font-bold">Selecione um Workspace para gerenciar chats</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Chat Builder"
        subtitle="Configure a aparência do seu widget de chat"
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-panel border border-border-ui rounded-lg overflow-hidden h-9">
              <div className="px-3 border-r border-border-ui h-full flex items-center bg-white/5">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-tighter">
                  Chat Ativo:
                </span>
              </div>
              <Select
                value={activeChatId}
                onChange={(e) => setActiveChat(e.target.value)}
                className="border-none bg-transparent h-full px-4 rounded-none h-9"
              >
                {chats?.map((chat: any) => (
                  <option key={chat.id} value={chat.id}>
                    {chat.name}
                  </option>
                ))}
              </Select>
            </div>

            <button
              onClick={handleCreateChat}
              disabled={isCreating}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold border border-primary/20 rounded-lg hover:brightness-110 shadow-lg shadow-primary/20 transition-all h-9"
            >
              {isCreating ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Plus size={16} />
              )}
              Novo Chat
            </button>
          </div>
        }
      />
      <div className="flex-1 flex overflow-hidden">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : chats && chats.length > 0 ? (
          <>
            <SettingsPanel />
            <WidgetPreview />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-text-secondary">
            <MessageSquareOff size={48} />
            <p className="font-bold">Crie seu primeiro chat para começar</p>
            <button
              onClick={handleCreateChat}
              className="text-primary font-bold hover:underline"
            >
              + Criar Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
