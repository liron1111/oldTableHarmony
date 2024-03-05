import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserByCredentials = async (email: string, password: string) => {
  try {
    const user = await getUserByEmail(email);

    if (!user || !user.password) return null;

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) return user;

    return null;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getUserServersById = async (id: string) => {
  try {
    const servers = await prisma.server.findMany({
      where: {
        members: {
          some: { 
            userId: id,
          }
        }
      }
    });

    return servers;
  } catch {
    return [];
  }
};