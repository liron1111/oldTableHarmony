"use server";

import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const joinServer = async (
  inviteCode: string, 
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  try {
    await prisma.server.update({
      where: {
        inviteCode: inviteCode,
      },
      data: {
        members: {
          create: [
            {
              userId: user.id,
            }
          ]
        }
      }
    });
  }
  catch (error) {
    return { error: "Failed joining server!" };
  }

  return { success: "Joined server!" };
}; 