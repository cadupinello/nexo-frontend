import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle2, Loader2, Send, XCircle } from 'lucide-react'
import { useState } from 'react'
import { usePostTelegramIntegration } from '../../api/mutations/usePostTelegramIntegration'
import { useGetChats } from '../../api/queries/useGetChats'
import { useGetTelegramIntegration } from '../../api/queries/useGetTelegramIntegration'
import { useWorkspaceStore } from '../../features/workspaces/store/workspace-store'
import { Header } from '../../shared/components/layout/Header'
import { Select } from '../../shared/components/ui/Select'

export const Route = createFileRoute('/_app/integrations')({
  component: IntegrationsPage,
})

function IntegrationsPage() {
  const { activeWorkspaceId } = useWorkspaceStore()
  const { data: chats } = useGetChats(activeWorkspaceId ?? undefined)


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

      <div className="mx-auto w-full max-w-4xl space-y-8 p-8">
        <div className="card border border-border-ui bg-panel shadow-xl shadow-black/20 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-border-ui/50 bg-[#0088CC]/10 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0088CC] shadow-lg shadow-[#0088CC]/30">
                <Send className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Telegram Bot</h3>
                <p className="text-xs text-text-secondary">Conecte seu próprio bot para automação</p>
              </div>
            </div>

            <div className={`badge badge-md gap-2 py-3 px-4 font-bold uppercase tracking-wider ${currentIntegration ? "badge-success bg-green-500/10 text-green-500 border-green-500/20" : "badge-warning bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
              }`}>
              {currentIntegration ? (
                <>
                  <CheckCircle2 size={14} />
                  Conectado
                </>
              ) : (
                <>
                  <XCircle size={14} />
                  Desconectado
                </>
              )}
            </div>
          </div>

          <div className="card-body p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Select
                label="Selecione o Chat"
                value={selectedChatId}
                onChange={(e) => setSelectedChatId(e.target.value)}
              >
                <option value="">Selecione um Chat...</option>
                {chats?.map((chat: any) => (
                  <option key={chat.id} value={chat.id}>{chat.name}</option>
                ))}
              </Select>

              <div className="form-control w-full space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary pl-1">
                  Bot Token (@BotFather)
                </label>
                <input
                  type="password"
                  placeholder="123456789:ABCDefGhi..."
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="input input-bordered w-full rounded-xl bg-bg-start text-sm font-mono focus:border-primary"
                />
              </div>
            </div>

            <div className="alert bg-bg-start/50 border-dashed border-border-ui rounded-xl py-4">
              <p className="text-xs leading-relaxed text-text-secondary">
                O Nexo processará as mensagens enviadas para este bot usando o fluxo vinculado.
              </p>
            </div>

            <div className="card-actions">
              <button
                disabled={isPending || !selectedChatId || !token}
                onClick={handleConnect}
                className="btn btn-primary w-full md:w-auto px-8 rounded-xl font-bold shadow-lg shadow-[#0088CC]/20"
              >
                {isPending ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                {currentIntegration ? 'Atualizar Conexão' : 'Conectar Bot'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
