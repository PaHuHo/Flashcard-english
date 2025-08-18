import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Please enter email"),
  password: yup.string().min(6, "Password have 6 char").required("Please enter password"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
