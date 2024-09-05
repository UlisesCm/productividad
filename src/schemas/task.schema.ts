import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Se requiere de un titulo"),
  description: z.string().min(1, "Se requiere de una descripción"),
  predefinedTime: z.string().min(1, "Se requiere de una duración"),
});
