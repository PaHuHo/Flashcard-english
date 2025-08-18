import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup
    .string()
    .required("Username not empty")
    .max(15, "Username only max 15 char"),
  email: yup.string().email("Invalid email").required("Please enter email"),
  password: yup
    .string()
    .min(6, "Password have 6 char")
    .required("Please enter password"),
  role: yup.number().required("Please choose type account"),
});

export type RegisterFormData = yup.InferType<typeof registerSchema>;
