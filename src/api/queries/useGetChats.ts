import { useQuery } from "@tanstack/react-query";
import type { ChatSettings } from "../../features/chatBuilder/store/chat-builder-store";
import { api } from "../instance";

export const useGetChats = (workspaceId?: string) => {
  return useQuery({
    queryKey: ["chats", workspaceId],
    queryFn: async () => {
      const { data } = await api.get<ChatSettings[]>("/chats", {
        params: { workspaceId },
      });
      return data;
    },
    enabled: !!workspaceId,
  });
};
