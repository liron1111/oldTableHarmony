import { prisma } from "@/lib/prisma";

export const getChannelById = async (id: string) => {
  try {
    const channel = await prisma.channel.findFirst({ where: { id }});
    
    return channel;
  } catch {
    return null;
  }
}