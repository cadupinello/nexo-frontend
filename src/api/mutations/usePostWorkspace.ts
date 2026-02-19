import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../instance";

export const usePostWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const { data } = await api.post("/workspaces", { name });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });
};
