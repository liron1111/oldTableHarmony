import { ServerList } from "@/components/navigation/server-list";

export default async function ServerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <ServerList />
      {children}
    </div>
  );
}