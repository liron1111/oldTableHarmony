"use client";

import Image from "next/image";
import { ActionTooltip } from "@/components/action-tooltip";
import Link from "next/link";

interface ServerListItemProps {
  id: string;
  imageUrl: string;
  name: string;
};

export const ServerListItem = ({
  id,
  imageUrl,
  name
}: ServerListItemProps) => {
  return (
    <ActionTooltip
      side="right"
      align="center"
      label={name}
    >
      <button className="relative h-10 w-10">
        <Link href={`/social/servers/${id}`}>
          <Image
            fill
            src={imageUrl}
            alt="Server"
          />
        </Link>
      </button>
    </ActionTooltip>
  )
}