import React from 'react'
import { ServerHeader } from '@/components/server/server-header';
import { getServerById } from '@/data/server';
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
  const server = await getServerById(serverId) as ServerWithMembersWithProfiles;

  return (
    <div>
      <ServerHeader server={server} role={role} />
    </div>
  )
}
