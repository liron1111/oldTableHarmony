import { Navbar } from "@/components/navigation/navbar";
import { Separator } from "@/components/ui/separator";

export default async function MainLayout({
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
      {children}
    </div>
  );
}