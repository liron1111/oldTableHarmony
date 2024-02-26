import { Navbar } from "@/components/navbar";

export default async function NavigationLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <div className='flex flex-col gap-4'>
      <Navbar />
      {children}
    </div>
  );
}