"use server";

import * as z from "zod";
import { v4 as uuidv4 } from "uuid";

import { CreateServerSchema } from "@/schemas/social";
import { prisma } from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";

export const createServer = async (
  values: z.infer<typeof CreateServerSchema>,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const validatedFields = CreateServerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, imageUrl } = values;

  try {
    await prisma.server.create({
      data: {
        creatorId: user.id,
        name: name,
        imageUrl: imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            { name: "general", creatorId: user.id }
          ]
        },
        members: {
          create: [
            { userId: user.id, role: MemberRole.ADMIN }
          ]
        }
      }
    });
  } catch (error) {
    return { error: "Failed creating server!" };
  }

  return { success: "Created server!" };
};