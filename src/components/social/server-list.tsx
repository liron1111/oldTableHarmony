import { ScrollArea } from "@/components/ui/scroll-area";
import { currentUser } from "@/lib/auth";
import { ServerListItem } from "@/components/social/server-list-item";
import { getServersByUserId } from "@/data/server";
import { ServerListAction } from "./server-list-action";

export const ServerList = async () => {
  const user = await currentUser();
  const servers = await getServersByUserId(user?.id as string);

  return (
    <div className="flex flex-col gap-4 bg-secondary-foreground w-fit p-2">
      <ServerListAction />
      <ScrollArea>
        {servers?.map((server) => (
          <div key={server.id} className="mb-4">
            <ServerListItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}