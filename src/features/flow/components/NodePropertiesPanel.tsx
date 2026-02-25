import { zodResolver } from "@hookform/resolvers/zod";
import { Settings2, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../../shared/components/ui/Input";
import { Select } from "../../../shared/components/ui/Select";
import { Textarea } from "../../../shared/components/ui/Textarea";
import { nodeDataSchema, type NodeData } from "../../../shared/schemas/flow-schemas";
import { useFlowStore } from "../store/flow.store";

export function NodePropertiesPanel() {
  const {
    nodes,
    selectedNodeId,
    setSelectedNodeId,
    updateNodeData,
    deleteNode,
  } = useFlowStore();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const {
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<NodeData>({
    resolver: zodResolver(nodeDataSchema),
    defaultValues: selectedNode?.data as NodeData,
  });

  useEffect(() => {
    if (selectedNode) {
      reset(selectedNode.data as NodeData);
    }
  }, [selectedNodeId, reset, selectedNode]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (selectedNodeId) {
        const timer = setTimeout(() => {
          updateNodeData(selectedNodeId, value as Partial<NodeData>);
        }, 500);
        return () => clearTimeout(timer);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, selectedNodeId, updateNodeData]);

  if (!selectedNodeId || !selectedNode) return null;

  return (
    <div className="card absolute left-6 top-24 bottom-24 w-80 z-50 flex-col overflow-hidden border border-border-ui bg-panel/80 backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-left-4 duration-300">
      {/* Header */}
      <div className="flex flex-row items-center justify-between border-b border-border-ui bg-white/5 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <Settings2 size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold capitalize text-text-primary">
              {selectedNode.type}
            </h3>
            <p className="text-[10px] font-black uppercase tracking-tight text-text-secondary opacity-40">
              Configurações
            </p>
          </div>
        </div>
        <button
          onClick={() => setSelectedNodeId(null)}
          className="btn btn-ghost btn-sm btn-circle text-text-secondary transition-all hover:rotate-90"
        >
          <X size={18} />
        </button>
      </div>

      {/* Form Content */}
      <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-5">
        <div className="space-y-4">
          <Input
            label="Título do Bloco"
            placeholder="Ex: Mensagem Inicial"
            {...register("label")}
            error={errors.label?.message}
          />

          {selectedNode.type === "message" && (
            <div className="space-y-4 pt-2">
              <Textarea
                label="Conteúdo da Mensagem"
                placeholder="O que o bot deve dizer?"
                {...register("content")}
                error={errors.content?.message}
                className="h-32"
              />

              <div className="form-control rounded-2xl border border-border-ui/50 bg-white/5 p-4">
                <label className="label flex cursor-pointer items-center justify-between p-0">
                  <div className="flex flex-col">
                    <span className="label-text text-[10px] font-black uppercase tracking-widest">
                      Esperar resposta?
                    </span>
                    <span className="text-[9px] text-text-secondary">
                      Pausa o fluxo até uma resposta
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary toggle-sm"
                    {...register("waitResponse")}
                  />
                </label>

                {watch("waitResponse") && (
                  <div className="mt-4 border-t border-border-ui pt-4 animate-in fade-in slide-in-from-top-2">
                    <Input
                      label="Salvar resposta em:"
                      placeholder="Ex: nome_cliente"
                      {...register("saveVariable")}
                      error={errors.saveVariable?.message}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedNode.type === "action" && (
            <div className="space-y-4 pt-2">
              <Input
                label="URL da API (Webhook)"
                placeholder="https://sua-api.com/endpoint"
                {...register("url")}
                error={errors.url?.message}
              />

              <Select label="Método HTTP" {...register("method")}>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
              </Select>
            </div>
          )}

          {selectedNode.type === "condition" && (
            <div className="space-y-4 pt-2">
              <Textarea
                label="Pergunta/Critério"
                placeholder="Ex: O cliente quer falar com atendente?"
                {...register("criteria")}
                error={errors.criteria?.message}
                className="h-24"
              />

              <Input
                label="Valor para seguir 'SIM'"
                placeholder="Ex: 1 ou Sim (Vazio = Inteligente)"
                {...register("matchValue")}
                error={errors.matchValue?.message}
              />

              <Input
                label="Salvar resposta em:"
                placeholder="Ex: opcao_menu"
                {...register("saveVariable")}
                error={errors.saveVariable?.message}
              />
            </div>
          )}
        </div>

        {/* Status Info */}
        <div className="alert bg-primary/5 border border-primary/10 rounded-2xl p-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                Auto-Save Ativo
              </span>
            </div>
            <p className="text-[9px] leading-relaxed text-text-secondary opacity-70">
              Sincronizado automaticamente com o fluxo.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-border-ui bg-white/5 p-5">
        <button
          className="btn btn-error btn-outline w-full gap-2 border-danger/20 hover:bg-danger hover:border-danger hover:text-white"
          onClick={() => deleteNode(selectedNode.id)}
        >
          <Trash2 size={16} />
          Deletar Bloco
        </button>
      </div>
    </div>
  );
}
