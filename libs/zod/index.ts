import { z } from "zod";

// CREATE ACCOUNT SCHEMA
export const createAccountSchema = z.object({
  firstname: z.string().min(3, "Use 3 characters or more"),
  lastname: z.string().min(3, "Use 3 characters or more"),
  email: z.string().email(),
});

export type TCreateAccountSchema = z.infer<typeof createAccountSchema>;
