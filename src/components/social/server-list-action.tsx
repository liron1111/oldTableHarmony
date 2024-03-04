"use client";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export const ServerListAction = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip
        side="right"
        align="center"
        label="Add a server"
      >
        <Button size="icon" onClick={() => onOpen("createServer")}>
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only">action</span>
        </Button>
      </ActionTooltip>
    </div>
  )
}