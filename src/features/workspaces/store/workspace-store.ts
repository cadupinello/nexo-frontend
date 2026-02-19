import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Workspace {
  id: string
  name: string
}

interface WorkspaceState {
  workspaces: Workspace[]
  activeWorkspaceId: string | null
  setWorkspaces: (workspaces: Workspace[]) => void
  setActiveWorkspaceId: (id: string) => void
  getActiveWorkspace: () => Workspace | null
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      workspaces: [],
      activeWorkspaceId: null,

      setWorkspaces: (workspaces) => set({ workspaces }),
      
      setActiveWorkspaceId: (id) => set({ activeWorkspaceId: id }),

      getActiveWorkspace: () => {
        const { workspaces, activeWorkspaceId } = get()
        return workspaces.find(w => w.id === activeWorkspaceId) || null
      }
    }),
    {
      name: "nexo-workspace-storage",
    }
  )
)
