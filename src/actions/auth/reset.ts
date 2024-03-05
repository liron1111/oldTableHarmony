"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetTokenEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" }
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetTokenEmail(passwordResetToken.email, passwordResetToken.token);

  return { success: "Reset email sent!" }
};