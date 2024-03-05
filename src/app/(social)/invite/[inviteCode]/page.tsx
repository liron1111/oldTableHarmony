import { InviteForm } from "@/components/social/invite-form"
import { getServerByInviteCode, getServerByInviteCodeAndUserId } from "@/data/server";
import { currentUser } from "@/lib/auth"
import { redirect } from "next/navigation";

interface InvitePageProps {
  params: {
    inviteCode: string,
  }
}
export default async function InvitePage({
  params,
}: InvitePageProps) {
  const user = await currentUser();
  const existingServer = await getServerByInviteCodeAndUserId(params.inviteCode, user?.id as string);

  if (existingServer) {
    return redirect(`/social/servers/${existingServer.id}`);
  }

  const server = await getServerByInviteCode(params.inviteCode);

  if (!server) {
    return redirect("/social")
  }

  return (
    <InviteForm server={server} />
  )
}
