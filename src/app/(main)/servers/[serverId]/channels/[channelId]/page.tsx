import { ServerSidebar } from '@/components/server/server-sidebar';
import React from 'react'

interface ChannelIdPageProps {
  params: {
    serverId: string;
  }
};

export default function ChannelIdPage({
  params
} : ChannelIdPageProps) {
  return (
    <div>
      <ServerSidebar serverId={params.serverId} />
    </div>
  )
}
