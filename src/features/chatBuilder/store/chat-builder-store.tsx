import { create } from "zustand"
import { persist } from "zustand/middleware"


export interface ChatSettings {
  id: string
  name: string
  botName: string
  welcomeMessage: string
  mainColor: string
  buttonIcon: "default" | "sparkles" | "message"
  position: "right" | "left"
  borderRadius: "none" | "medium" | "full"
  headerBackgroundColor: string
  headerTextColor: string
  userBubbleColor: string
  botBubbleColor: string
  botTextColor: string
}

interface ChatBuilderState {
  chats: ChatSettings[]
  activeChatId: string
  setSettings: <K extends keyof ChatSettings>(key: K, value: ChatSettings[K]) => void
  setFullSettings: (id: string, settings: ChatSettings) => void
  setActiveChat: (id: string) => void
  getActiveSettings: () => ChatSettings
}

const DEFAULT_CHAT: ChatSettings = {
  id: "default",
  name: "Chat Padrão",
  botName: "Nexo Assistant",
  welcomeMessage: "Olá! Como posso ajudar você hoje?",
  mainColor: "#3b82f6",
  buttonIcon: "default",
  position: "right",
  borderRadius: "medium",
  headerBackgroundColor: "#3b82f6",
  headerTextColor: "#ffffff",
  userBubbleColor: "#3b82f6",
  botBubbleColor: "#f1f5f9",
  botTextColor: "#1e293b",
}

export const useChatBuilderStore = create<ChatBuilderState>()(
  persist(
    (set, get) => ({
      chats: [DEFAULT_CHAT],
      activeChatId: "default",

      getActiveSettings: () => {
        const { chats, activeChatId } = get()
        return chats.find(c => c.id === activeChatId) || DEFAULT_CHAT
      },

      setSettings: (key, value) => set((state) => ({
        chats: state.chats.map(chat =>
          chat.id === state.activeChatId ? { ...chat, [key]: value } : chat
        )
      })),

      setFullSettings: (id, settings) => set((state) => {
        const exists = state.chats.find(c => c.id === id)
        if (exists) {
          return {
            chats: state.chats.map(c => c.id === id ? settings : c)
          }
        }
        return {
          chats: [...state.chats, settings]
        }
      }),

      setActiveChat: (id) => set({ activeChatId: id })
    }),
    {
      name: "chat-builder-settings",
    }
  )
)