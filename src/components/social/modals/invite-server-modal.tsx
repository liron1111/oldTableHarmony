"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/use-modal-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { 
  CheckIcon, 
  CopyIcon, 
  ReloadIcon 
} from "@radix-ui/react-icons";
import { DialogDescription } from "@radix-ui/react-dialog";
import { updateInviteCode } from "@/actions/server/update-invite-code";

export const InviteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onClick = () => {    
    startTransition(() => {
      updateInviteCode(server?.id as string)
        .then((data) => {
          console.log(data);
        }).catch(() => console.log("Something went wrong!"));
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Members
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm text-center">
            Send a server invite link to a friend.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Label>Server invite link</Label>
          <div className="flex items-center gap-2">
            <Input
              disabled={isPending}
              className="focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button disabled={isPending} onClick={onCopy} size="icon" variant="outline">
              {copied 
                ? <CheckIcon className="w-4 h-4" /> 
                : <CopyIcon className="w-4 h-4" />
              }
            </Button>
          </div>
          <Button
            onClick={onClick}
            disabled={isPending}
            variant="link"
            size="sm"
            className="text-xs text-muted-foreground"
          >
            Generate a new link
            <ReloadIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}