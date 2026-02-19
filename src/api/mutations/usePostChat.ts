import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../instance";

export const usePostChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, workspaceId }: { name: string; workspaceId: string }) => {
      const { data } = await api.post("/chats", { name, workspaceId });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};
