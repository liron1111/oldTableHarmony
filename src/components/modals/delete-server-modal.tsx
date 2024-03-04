"use client";

import { useState, useTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

export const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = data;
  
  const [isPending, startTransition] = useTransition();

  const onClick = async () => {
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to do this? {''}
            <span className="font-semibold text-primary">&quot;{server?.name}&quot;</span> {''}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-secondary px-6 py-4">
          <div className="flex items-center justify-end w-full">
            <Button
              disabled={isPending}
              onClick={onClose}
              variant="link"
              className="text-secondary-foreground"
            >
              Cancel
            </Button>
            <Button
              variant="destructive" 
              disabled={isPending}
              onClick={onClick}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}