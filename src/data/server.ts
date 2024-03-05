import { prisma } from "@/lib/prisma";

export const getServerWithMembersWithProfilesById = async (id: string) => {
  try {
    const server = await prisma.server.findUnique({
      where: { id },
      include: {
        channels: {
          orderBy: {
            createdAt: "asc",
          },
        },
        members: {
          include: {
            user: true,
          },
          orderBy: {
            role: "asc",
          }
        }
      }
    });
    
    return server;
  } catch {
    return null;
  }
};

export const getServerByIdAndUserId = async (id: string, userId: string) => {
  try {
    const server = await prisma.server.findUnique({
      where: {
        id: id,
        members: {
          some: { userId }
        }
      }
    });
    
    return server;
  } catch {
    return null;
  }
};

export const getServerByInviteCodeAndUserId = async (inviteCode: string, userId: string) => {
  try {
    const server = await prisma.server.findUnique({
      where: {
        inviteCode: inviteCode,
        members: {
          some: { userId }
        }
      }
    });
    
    return server;
  } catch {
    return null;
  }
};

export const getServerByInviteCode = async (inviteCode: string) => {
  try {
    const server = await prisma.server.findUnique({
      where: {
        inviteCode: inviteCode,
      }
    });
    
    return server;
  } catch {
    return null;
  }
};