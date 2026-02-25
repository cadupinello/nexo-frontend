import { ArrowRight, Mail, MessageCircle, Sparkles } from "lucide-react"
import { useChatBuilderStore } from "../store/chat-builder-store"

export function WidgetPreview() {
  const { getActiveSettings } = useChatBuilderStore()
  const chatConfig = getActiveSettings()
  const settings = chatConfig?.settings || (chatConfig as any)
  const {
    mainColor = "#3b82f6",
    position = "right",
    botName = "Assistant",
    borderRadius = "medium",
    buttonIcon = "default",
    welcomeMessage = "Olá! Como posso ajudar você hoje?",
    headerBackgroundColor = "#3b82f6",
    headerTextColor = "#ffffff",
    userBubbleColor = "#3b82f6",
    botBubbleColor = "#f1f5f9",
    botTextColor = "#1e293b"
  } = settings

  const radiusClasses = {
    none: "rounded-none",
    medium: "rounded-2xl",
    full: "rounded-full"
  } as const

  const icons = {
    default: MessageCircle,
    sparkles: Sparkles,
    message: Mail
  } as const

  const Icon = icons[buttonIcon as keyof typeof icons] || MessageCircle

  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-bg-end/50">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />

      <div className="z-0 text-center">
        <span className="block select-none text-6xl font-black uppercase tracking-[0.3em] text-text-secondary/10">
          Preview
        </span>
        <span className="block mt-2 select-none text-xl font-bold uppercase tracking-[0.2em] text-text-secondary/5">
          Ambiente do Site
        </span>
      </div>

      <div className={`absolute bottom-10 ${position === 'right' ? 'right-10' : 'left-10'} flex w-full max-w-[320px] flex-col items-end gap-5`}>

        <div className={`card overflow-hidden border border-border-ui bg-panel shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-4 duration-700 ${radiusClasses[(borderRadius === 'full' ? 'medium' : borderRadius) as keyof typeof radiusClasses]}`}>
          {/* Header */}
          <div
            style={{ backgroundColor: headerBackgroundColor, color: headerTextColor }}
            className="flex items-center gap-3 p-4"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <div className="h-2 w-2 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider">{botName}</p>
              <p className="text-[10px] opacity-70">Online agora</p>
            </div>
          </div>

          {/* Chat Body */}
          <div className="space-y-4 bg-bg-start/50 p-4">
            <div className="chat chat-start">
              <div
                style={{ backgroundColor: botBubbleColor, color: botTextColor }}
                className="chat-bubble min-h-0 text-xs shadow-sm leading-relaxed"
              >
                {welcomeMessage || "Olá! Como posso ajudar você hoje?"}
              </div>
            </div>

            <div className="chat chat-end">
              <div
                style={{ backgroundColor: userBubbleColor, color: '#fff' }}
                className="chat-bubble min-h-0 text-xs shadow-sm leading-relaxed"
              >
                Gostaria de saber mais sobre o plano Pro.
              </div>
            </div>
          </div>

          {/* Input Footer */}
          <div className="flex gap-2 border-t border-border-ui bg-white/5 p-3">
            <div className="flex h-8 flex-1 items-center rounded-full border border-border-ui bg-bg-start px-3">
              <span className="text-[10px] font-medium text-text-secondary/50">Digite uma mensagem...</span>
            </div>
            <div
              style={{ backgroundColor: mainColor }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg"
            >
              <ArrowRight size={14} />
            </div>
          </div>
        </div>

        {/* Floating Toggle Button */}
        <button
          style={{ backgroundColor: mainColor }}
          className={`group relative flex h-16 w-16 items-center justify-center text-white shadow-xl transition-all hover:scale-110 active:scale-95 ${radiusClasses[borderRadius as keyof typeof radiusClasses]}`}
        >
          <div className="absolute inset-0 rounded-inherit bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
          <Icon size={28} className="drop-shadow-md" />
        </button>
      </div>
    </div>
  );
}