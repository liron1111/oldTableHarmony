"use client";

import Image from "next/image";
import { useTransition } from "react";
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server } from "@prisma/client";
import { joinServer } from "@/actions/server/invite";
import { redirect, useRouter } from "next/navigation";

interface InviteFormProps {
  server: Server,
};

export const InviteForm = ({
  server
}: InviteFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onClick = () => {
    startTransition(() => {
      joinServer(server.inviteCode)
        .then((data) => {
          router.refresh();
        }).catch(() => console.log("Something went wrong!"));
    });
  };

  return (
    <div className="grid h-screen place-items-center">
      <Card className="min-w-[400px] shadow-md flex flex-col items-center">
        <CardHeader>
          <div className="w-12 h-12 relative -mb-4">
            <Image 
              fill
              src={server.imageUrl}
              alt="image"
              className="rounded-sm"
            />
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <span className="text-muted-foreground text-sm">You have been invited to join</span> <br />
          <span className="text-bold text-xl">{server.name}</span>
        </CardContent>
        <CardFooter className="w-full">
          <Button
            disabled={isPending}
            onClick={onClick}
            className="w-full"
          >
            Accept Invite
          </Button>
        </CardFooter>
    </Card>
  </div>
  )
}