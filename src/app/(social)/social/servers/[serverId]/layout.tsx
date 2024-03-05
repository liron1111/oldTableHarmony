import { ServerSidebar } from "@/components/social/server/server-sidebar";
import { getServerByIdAndUserId } from "@/data/server";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

interface ServerIdLayoutProps {
  children: React.ReactNode,
  params: {
    serverId: string,
  }
}

export default async function ServerIdLayout({
  children,
  params,
}: ServerIdLayoutProps) {
  const user = await currentUser();
  const server = await getServerByIdAndUserId(params.serverId, user?.id as string);

  if (!server) {
    return redirect('/social');
  }

  return ( 
    <>
      <ServerSidebar serverId={params.serverId} />
      {children}
    </>
   );
}