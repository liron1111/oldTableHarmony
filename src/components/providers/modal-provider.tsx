"use client";

import { useEffect, useState } from "react";

import { CreateServerModal } from "@/components/social/modals/create-server-modal";
import { InviteServerModal } from "@/components/social/modals/invite-server-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteServerModal />
    </>
  )
}