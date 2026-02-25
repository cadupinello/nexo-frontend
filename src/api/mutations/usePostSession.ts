import { useMutation } from "@tanstack/react-query";
import { api } from "../instance";

interface CreateSessionParams {
  chatId: string;
}

interface ChatSession {
  id: string;
  flowId: string;
  currentNode: string;
  status: string;
  context: any;
}

export function usePostSession() {
  return useMutation({
    mutationFn: async ({ chatId }: CreateSessionParams) => {
      const { data } = await api.post<ChatSession>("/sessions", { chatId });
      return data;
    },
  });
}
