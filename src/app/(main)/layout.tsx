import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <div className='flex flex-col'>
      <>
        <Navbar />
        <Separator />
      </>
      {children}
    </div>
  );
}