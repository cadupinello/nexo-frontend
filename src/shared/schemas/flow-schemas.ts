import { z } from "zod";

export const nodeDataSchema = z.object({
  label: z.string().min(1, "O título é obrigatório"),
  content: z.string().optional(),
  saveVariable: z.string().optional(),
  waitResponse: z.boolean().optional(),
  url: z.string().url("URL inválida").optional().or(z.literal("")),
  method: z.enum(["GET", "POST", "PUT"]).optional(),
  criteria: z.string().optional(),
  matchValue: z.string().optional(),
});

export type NodeData = z.infer<typeof nodeDataSchema>;

export const chatSettingsSchema = z.object({
  botName: z.string().min(1, "Nome do bot é obrigatório"),
  welcomeMessage: z.string().min(1, "Mensagem de boas-vindas é obrigatória"),
  mainColor: z.string().regex(/^#([0-9a-f]{3}){1,2}$/i, "Cor inválida"),
  headerBackgroundColor: z.string().regex(/^#([0-9a-f]{3}){1,2}$/i, "Cor inválida"),
  headerTextColor: z.string().regex(/^#([0-9a-f]{3}){1,2}$/i, "Cor inválida"),
  userBubbleColor: z.string().regex(/^#([0-9a-f]{3}){1,2}$/i, "Cor inválida"),
  botBubbleColor: z.string().regex(/^#([0-9a-f]{3}){1,2}$/i, "Cor inválida"),
  botTextColor: z.string().regex(/^#([0-9a-f]{3}){1,2}$/i, "Cor inválida"),
});

export type ChatSettings = z.infer<typeof chatSettingsSchema>;
