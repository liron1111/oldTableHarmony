import * as z from "zod";

export const UpdateSchema = z.object({
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
}).refine((data) => {
  if (data.password && !data.newPassword) {
    return false;
  }

  return true;
}, {
  message: "New password is required!",
  path: ["newPassword"]
}).refine((data) => {
  if (data.newPassword && !data.password) {
    return false;
  }

  return true;
}, {
  message: "Password is required!",
  path: ["password"]
})
