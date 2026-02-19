import { useQuery } from "@tanstack/react-query";
import { api } from "../instance";

export const useGetFlow = (chatId: string) => {
  return useQuery({
    queryKey: ["flow", chatId],
    queryFn: async () => {
      if (!chatId) return null;
      const { data } = await api.get(`/chats/${chatId}/flow`);
      return data;
    },
    enabled: !!chatId,
  });
};
