"use server";

import { v4 as uuidv4 } from "uuid";

import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const updateInviteCode = async (
  serverId: string,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  try {
    await prisma.server.update({
      where: {
        id: serverId,
        creatorId: user.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    }); 
  }
  catch (error) {
    return { error: "Failed updating server!" };
  }

  return { success: "Updated server!" };
}; 