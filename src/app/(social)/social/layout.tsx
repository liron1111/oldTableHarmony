import { Navbar } from "@/components/navbar";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ServerList } from "@/components/social/server-list";
import { Separator } from "@/components/ui/separator";

export default async function SocialLayout({
  children,
} : {
  children: React.ReactNode,
}) {
  return ( 
    <div className='flex flex-col'>
      <>
        <Navbar />
        <Separator />
      </>
      <ModalProvider />
      <>
        <ServerList />
        {children}
      </>
    </div>
  );
}