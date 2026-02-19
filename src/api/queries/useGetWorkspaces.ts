import { useQuery } from "@tanstack/react-query";
import { api } from "../instance";

export interface Workspace {
  id: string;
  name: string;
}

export const useGetWorkspaces = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const { data } = await api.get<Workspace[]>("/workspaces");
      return data;
    },
  });
};
