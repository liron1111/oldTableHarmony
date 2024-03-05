import { getUserServersById } from "@/data/user";
import { currentUser } from "@/lib/auth"
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerListItem } from "@/components/social/server-list-item";
import { ServerListAction } from "@/components/social/server-list-action";

export const ServerList = async () => {
  const user = await currentUser();
  const servers = await getUserServersById(user?.id as string);

  return (
    <>
      <ServerListAction />
      <ScrollArea>
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <ServerListItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
    </>
  )
}