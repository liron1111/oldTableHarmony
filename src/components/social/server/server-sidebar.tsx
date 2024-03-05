import { ServerHeader } from '@/components/social/server/server-header';
import { getServerWithMembersWithProfilesById } from '@/data/server';
import { currentRole } from '@/lib/auth';
import { MemberRole } from '@prisma/client';
import { ServerWithMembersWithProfiles } from '@/types';

interface ServerSidebarProps {
  serverId: string;
}

export const ServerSidebar = async ({
  serverId
}: ServerSidebarProps) => {
  const role = await currentRole() as MemberRole;
  const server = await getServerWithMembersWithProfilesById(serverId) as ServerWithMembersWithProfiles;

  return (
    <>
      <ServerHeader server={server} role={role} />
    </>
  )
}
