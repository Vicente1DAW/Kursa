import { loginSchema, registerSchema, LoginFormData } from "../schemas/auth.schema";
import { z } from "zod";

export const useLogin = () => {
  return { schema: loginSchema, defaultValues: { email: "", password: "" } as LoginFormData };
};

export const useRegister = () => {
  return { schema: registerSchema, defaultValues: { email: "", password: "", role: "estudiante" } as z.input<typeof registerSchema> };
};
