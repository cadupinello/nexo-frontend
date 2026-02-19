import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../instance";

interface TelegramPayload {
  chatId: string;
  workspaceId: string;
  token: string;
}

export const usePostTelegramIntegration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TelegramPayload) => {
      const { data } = await api.post("/integrations/telegram", payload);
      return data;
    },
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries({ queryKey: ["telegram-integration", chatId] });
    },
  });
};
