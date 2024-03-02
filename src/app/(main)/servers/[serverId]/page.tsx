import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";

interface ServerIdPageProps {
  params: {
    serverId: string;
  }
};

export default async function ServerIdPage({
  params
}: ServerIdPageProps) {
  const user = await currentUser();

  const server = await prisma.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          userId: user?.id,
        }
      }
    },
    include: {
      channels: {
        where: {
          name: "general"
        },
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  });

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
}