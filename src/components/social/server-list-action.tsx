"use client";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

export const ServerListAction = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip
        side="right"
        align="center"
        label="Add a server"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <PlusIcon />
          <span className="sr-only">add server</span>
        </Button>
      </ActionTooltip>
    </div>
  )
}