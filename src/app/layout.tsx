import "./globals.css";
import type { Metadata } from "next";
import { Fredoka } from 'next/font/google';
import { ThemeProvider } from "@/components/theme/provider";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const fredoka = Fredoka({ subsets: ['latin'], });

export const metadata: Metadata = {
  title: "TableHarmony",
  description: "Bagrut project",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`m-2 ${fredoka.className}`}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}