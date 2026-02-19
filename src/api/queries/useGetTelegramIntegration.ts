import { useQuery } from "@tanstack/react-query";
import { api } from "../instance";

export const useGetTelegramIntegration = (chatId: string) => {
  return useQuery({
    queryKey: ["telegram-integration", chatId],
    queryFn: async () => {
      if (!chatId) return null;
      try {
        const { data } = await api.get(`/integrations/telegram/${chatId}`);
        return data;
      } catch (e) {
        return null; // 404
      }
    },
    enabled: !!chatId,
  });
};
