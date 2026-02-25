import { Loader2, Save } from "lucide-react";
import { usePatchChatSettings } from "../../../api/mutations/usePatchChatSettings";
import { Select } from "../../../shared/components/ui/Select";
import { useChatBuilderStore } from "../store/chat-builder-store";

export function SettingsPanel() {
  const { getActiveSettings, setSettings, updateSetting } = useChatBuilderStore();
  const { mutate: save, isPending } = usePatchChatSettings();

  const chatConfig = getActiveSettings();
  const { id, name, settings: rawSettings } = chatConfig;
  const settings = rawSettings || (chatConfig as any);
  const {
    botName = "",
    welcomeMessage = "",
    mainColor = "#3b82f6",
    position = "right",
    borderRadius = "medium",
    buttonIcon = "default",
    headerBackgroundColor = "#3b82f6",
    headerTextColor = "#ffffff",
    userBubbleColor = "#3b82f6",
    botBubbleColor = "#f1f5f9",
    botTextColor = "#1e293b",
  } = settings;

  return (
    <div className="relative flex w-80 flex-col gap-6 overflow-y-auto border-r border-border-ui bg-bg-start p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-text-primary opacity-80">
          Customização
        </h2>
        <button
          onClick={() => save({ id, settings: chatConfig })}
          disabled={isPending}
          className="btn btn-ghost btn-sm btn-square hover:bg-primary hover:text-white"
          title="Salvar Alterações"
        >
          {isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                Configuração
              </span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setSettings("name", e.target.value)}
              className="input input-bordered h-10 w-full bg-panel text-xs font-bold focus:border-primary"
              placeholder="Ex: Chat Suporte"
            />
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                Nome do Bot
              </span>
            </label>
            <input
              type="text"
              value={botName}
              onChange={(e) => updateSetting("botName", e.target.value)}
              className="input input-bordered h-10 w-full bg-panel text-xs font-medium focus:border-primary"
              placeholder="Ex: Nexo Assistant"
            />
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                Boas-vindas
              </span>
            </label>
            <textarea
              value={welcomeMessage}
              onChange={(e) => updateSetting("welcomeMessage", e.target.value)}
              className="textarea textarea-bordered h-24 w-full bg-panel text-xs font-medium focus:border-primary leading-relaxed"
              placeholder="Ex: Olá! Como posso ajudar você hoje?"
            />
          </div>
        </div>

        <div className="divider opacity-10 my-2"></div>

        <div className="space-y-4">
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                Cores Visuais
              </span>
            </label>

            <div className="grid grid-cols-1 gap-2">
              {[
                { label: "Principal", key: "mainColor", value: mainColor },
                { label: "Header Fundo", key: "headerBackgroundColor", value: headerBackgroundColor },
                { label: "Header Texto", key: "headerTextColor", value: headerTextColor },
                { label: "Bolha Usuário", key: "userBubbleColor", value: userBubbleColor },
                { label: "Bolha Bot", key: "botBubbleColor", value: botBubbleColor },
                { label: "Texto Bot", key: "botTextColor", value: botTextColor },
              ].map((color) => (
                <div key={color.key} className="flex h-10 items-center justify-between gap-3 px-3 rounded-xl border border-border-ui bg-panel">
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-text-secondary">
                    {color.label}:
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono text-text-primary uppercase opacity-60">
                      {color.value}
                    </span>
                    <div className="relative h-5 w-5 cursor-pointer">
                      <input
                        type="color"
                        value={color.value}
                        onChange={(e) => updateSetting(color.key as any, e.target.value)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                      <div
                        className="h-full w-full rounded-md border border-white/10 shadow-inner"
                        style={{ backgroundColor: color.value }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="divider opacity-10 my-2"></div>

          <div className="space-y-3">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                  Layout & Estilo
                </span>
              </label>
              <div className="join w-full">
                {(["left", "right"] as const).map((pos) => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => updateSetting("position", pos)}
                    className={`btn join-item btn-xs h-9 flex-1 text-[10px] font-bold uppercase ${position === pos ? "btn-primary" : "btn-ghost bg-panel hover:bg-white/5"
                      }`}
                  >
                    {pos === "left" ? "Esquerda" : "Direita"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              <div className="form-control">
                <Select
                  label="Bordas"
                  value={borderRadius}
                  onChange={(e) => updateSetting("borderRadius", e.target.value as any)}
                  className="h-9 min-h-0 text-[10px] bg-panel"
                >
                  <option value="none">Quadradas</option>
                  <option value="medium">Arredondadas</option>
                  <option value="full">Círculo</option>
                </Select>
              </div>

              <div className="form-control">
                <Select
                  label="Ícone"
                  value={buttonIcon}
                  onChange={(e) => updateSetting("buttonIcon", e.target.value as any)}
                  className="h-9 min-h-0 text-[10px] bg-panel"
                >
                  <option value="default">💬 Balão</option>
                  <option value="sparkles">✨ Brilho</option>
                  <option value="message">✉️ Mensagem</option>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
