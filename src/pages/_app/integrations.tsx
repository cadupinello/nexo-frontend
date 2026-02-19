import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle2, Loader2, Send, XCircle } from 'lucide-react'
import { useState } from 'react'
import { usePostTelegramIntegration } from '../../api/mutations/usePostTelegramIntegration'
import { useGetChats } from '../../api/queries/useGetChats'
import { useGetTelegramIntegration } from '../../api/queries/useGetTelegramIntegration'
import { useWorkspaceStore } from '../../features/workspaces/store/workspace-store'
import { Header } from '../../shared/components/layout/Header'

export const Route = createFileRoute('/_app/integrations')({
  component: IntegrationsPage,
})

function IntegrationsPage() {
  const { activeWorkspaceId } = useWorkspaceStore()
  const { data: chats, isLoading: loadingChats } = useGetChats()

  // For simplicity, we'll let the user select a chat to integrate with Telegram
  const [selectedChatId, setSelectedChatId] = useState<string>('')
  const [token, setToken] = useState('')

  const { data: currentIntegration } = useGetTelegramIntegration(selectedChatId)
  const { mutate: connect, isPending } = usePostTelegramIntegration()

  const handleConnect = () => {
    if (!selectedChatId || !activeWorkspaceId || !token) {
      alert("Preencha todos os campos")
      return
    }
    connect({
      chatId: selectedChatId,
      workspaceId: activeWorkspaceId,
      token: token
    }, {
      onSuccess: () => alert("Bot conectado com sucesso!")
    })
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <Header
        title="Integrações"
        subtitle="Conecte o Nexo aos seus canais favoritos"
      />

      <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
        {/* Telegram Card */}
        <div className="bg-panel border border-border-ui rounded-2xl overflow-hidden shadow-xl shadow-black/20">
          <div className="bg-[#0088CC]/10 p-6 flex items-center justify-between border-b border-border-ui/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0088CC] rounded-xl flex items-center justify-center shadow-lg shadow-[#0088CC]/30">
                <Send className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Telegram Bot</h3>
                <p className="text-xs text-text-secondary">Conecte seu próprio bot para responder usuários automaticamente</p>
              </div>
            </div>

            {currentIntegration ? (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                <CheckCircle2 size={14} className="text-green-500" />
                <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">Conectado</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                <XCircle size={14} className="text-yellow-500" />
                <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-wider">Desconectado</span>
              </div>
            )}
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Selecione o Chat</label>
                <select
                  value={selectedChatId}
                  onChange={(e) => setSelectedChatId(e.target.value)}
                  className="w-full bg-bg-start border border-border-ui rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-primary transition-all appearance-none"
                >
                  <option value="">Selecione um Chat...</option>
                  {chats?.map((chat: any) => (
                    <option key={chat.id} value={chat.id}>{chat.name}</option>
                  ))}
                </select>
                {loadingChats && <p className="text-[10px] text-text-secondary italic">Carregando chats...</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Bot Token (@BotFather)</label>
                <input
                  type="password"
                  placeholder="123456789:ABCDefGhi..."
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full bg-bg-start border border-border-ui rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-primary transition-all font-mono"
                />
              </div>
            </div>

            <div className="bg-bg-start/50 border border-dashed border-border-ui rounded-xl p-4">
              <p className="text-xs text-text-secondary leading-relaxed">
                Ao conectar seu bot, o Nexo passará a processar todas as mensagens enviadas para ele usando o fluxo configurado para o chat selecionado. Certifique-se de que o token é válido.
              </p>
            </div>

            <button
              disabled={isPending || !selectedChatId || !token}
              onClick={handleConnect}
              className="w-full md:w-auto px-8 py-3 bg-[#0088CC] text-white rounded-xl font-bold hover:brightness-110 shadow-lg shadow-[#0088CC]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
              {currentIntegration ? 'Atualizar Conexão' : 'Conectar Bot'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
