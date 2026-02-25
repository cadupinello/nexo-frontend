import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GitGraph,
  Info,
  MessageSquare,
  Play,
  Send,
} from "lucide-react";
import { Header } from "../../shared/components/layout/Header";

export const Route = createFileRoute("/_app/docs")({
  component: DocsPage,
});

function DocsPage() {
  const sections = [
    {
      id: "chat-builder",
      title: "1. Chat Builder",
      description: "Personalize a interface do seu widget de chat para combinar com sua marca.",
      icon: MessageSquare,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      steps: [
        "Acesse o menu 'Chat Builder' na barra lateral.",
        "Defina o 'Nome do Bot' que aparecerá para os usuários.",
        "Configure a 'Mensagem de Boas-vindas' (ex: 'Olá! Como posso ajudar?').",
        "Escolha as cores primárias, do cabeçalho e das bolhas de mensagem.",
        "Não esqueça de clicar no botão 'Salvar' no topo do painel para aplicar as mudanças.",
      ],
    },
    {
      id: "flow-builder",
      title: "2. Flow Builder",
      description: "Crie a inteligência por trás do seu bot arrastando e conectando blocos.",
      icon: GitGraph,
      color: "text-primary",
      bg: "bg-primary/10",
      steps: [
        "Inicie vinculando um Chat existente ao fluxo no topo da página.",
        "O bloco 'Start' é o gatilho inicial, sincronizado com sua mensagem de boas-vindas.",
        "Bloco de Mensagem: Envia texto e pode esperar uma resposta do usuário.",
        "Bloco de Condição: Use IA ou palavras-chave para ramificar o fluxo (Sim/Não).",
        "Bloco de Ação: Realize chamadas de API (Webhook) para sistemas externos.",
        "Arraste as alças (handles) para conectar os blocos em uma sequência lógica.",
      ],
    },
    {
      id: "simulator",
      title: "3. Simulator",
      description: "Teste seu fluxo em tempo real antes de colocá-lo em produção.",
      icon: Play,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      steps: [
        "Escolha qual Chat você deseja simular.",
        "Use a 'Simulação Local' para testar rapidamente as mudanças no navegador.",
        "Use o 'Live Socket' para ver a execução processada pelo servidor em tempo real.",
        "Acompanhe o painel esquerdo para ver o caminho exato que a execução está tomando.",
        "O painel de contexto mostra todas as variáveis salvas durante a conversa.",
      ],
    },
    {
      id: "integrations",
      title: "4. Integrations",
      description: "Conecte seu fluxo automatizado aos canais de comunicação reais.",
      icon: Send,
      color: "text-[#0088CC]",
      bg: "bg-[#0088CC]/10",
      steps: [
        "Crie um bot no Telegram conversando com o @BotFather.",
        "Copie o 'API Token' fornecido por ele.",
        "No Nexo, vá em 'Integrations' e selecione o Chat que você configurou no Builder.",
        "Cole o Token e clique em 'Conectar Bot'.",
        "Pronto! Agora o seu bot do Telegram responderá seguindo o fluxo desenhado.",
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-bg-end/30">
      <Header
        title="Documentação"
        subtitle="Guia passo a passo para criar automações perfeitas no Nexo"
      />

      <div className="mx-auto w-full max-w-5xl space-y-12 p-8">
        <div className="card border border-border-ui bg-panel shadow-xl">
          <div className="card-body relative overflow-hidden p-8">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative flex flex-col md:flex-row gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-lg shadow-primary/5">
                <BookOpen size={28} />
              </div>

              <div className="space-y-4">
                <h2 className="card-title text-2xl font-black tracking-tight text-text-primary">
                  Começando com o Nexo
                </h2>
                <p className="leading-relaxed text-text-secondary">
                  Bem-vindo ao guia de configuração. Siga a ordem:
                  <span className="font-bold text-text-primary"> Designer → Lógica → Teste → Publicação</span>.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {sections.map(s => (
                    <a key={s.id} href={`#${s.id}`} className="badge badge-outline badge-md gap-2 font-bold py-3 px-4 hover:border-primary hover:text-primary transition-all">
                      <s.icon size={12} />
                      {s.title.split('. ')[1]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-16 pb-20">
          {sections.map((section, index) => (
            <div key={section.id} id={section.id} className="scroll-mt-24 space-y-8">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-transform hover:scale-110 duration-300 ${section.bg} ${section.color}`}>
                  <section.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight text-text-primary">{section.title}</h3>
                  <p className="text-sm text-text-secondary">{section.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-4 py-2">
                  {section.steps.map((step, i) => (
                    <div key={i} className="group flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/5 bg-border-ui text-[10px] font-black text-text-secondary transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                          {i + 1}
                        </div>
                        {i < section.steps.length - 1 && (
                          <div className="my-1 h-full w-0.5 bg-border-ui/30 transition-all group-hover:bg-primary/20" />
                        )}
                      </div>
                      <p className="pt-0.5 text-sm leading-relaxed text-text-secondary transition-colors group-hover:text-text-primary">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="card border border-border-ui bg-panel shadow-xl">
                  <div className="card-body p-6">
                    <div className="badge badge-primary badge-sm gap-2 font-black uppercase tracking-widest py-3 px-4 mb-2">
                      <Info size={12} />
                      Dica Pro
                    </div>
                    <p className="text-xs italic leading-relaxed text-text-secondary">
                      {index === 0 && "Cores contrastantes ajudam o usuário a identificar quem está falando. Use uma cor vibrante para o bot."}
                      {index === 1 && "Salve variáveis com nomes claros. Use {{nome_cliente}} para exibir dados dinâmicos em mensagens."}
                      {index === 2 && "Limpe as variáveis entre as simulações para garantir testes precisos."}
                      {index === 3 && "O modo Live Socket é idêntico ao comportamento real no Telegram."}
                    </p>
                    <div className="card-actions justify-end mt-4">
                      <button className="btn btn-ghost btn-xs font-black uppercase tracking-widest hover:text-primary group">
                        Ir para ferramenta
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card border border-primary/20 bg-primary/10">
          <div className="card-body flex-row items-center justify-between gap-8 p-8">
            <div>
              <h4 className="text-lg font-bold text-text-primary">Tudo pronto para começar?</h4>
              <p className="text-sm text-text-secondary">Crie sua primeira automação hoje mesmo.</p>
            </div>
            <div className="badge badge-primary badge-lg gap-2 py-6 px-8 font-black uppercase tracking-widest shadow-lg shadow-primary/20">
              <CheckCircle2 size={18} />
              Sucesso Garantido
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
