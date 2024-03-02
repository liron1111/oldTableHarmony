import { prisma } from "@/lib/prisma";

export const getServerById = async (id: string) => {
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

export const getServersByUserId = async (userId: string) => {
  try {
    const servers = await prisma.server.findMany({
      where: {
        members: {
          some: { userId }
        }
      }
    });

    return servers;
  } catch {
    return null;
  }
};