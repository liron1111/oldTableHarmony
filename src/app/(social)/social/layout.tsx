import { Navbar } from "@/components/navbar";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Separator } from "@/components/ui/separator";

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <div className='flex flex-col'>
      <div>
        <Navbar />
        <Separator />
      </div>
      <ModalProvider />
      {children}
    </div>
  );
}