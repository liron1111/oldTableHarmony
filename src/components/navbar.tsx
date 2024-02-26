'use client'
import Link from 'next/link';
import { ThemeToggle } from './theme/toggle';
import { Button } from './ui/button';
import { Profile } from './profile';
import { useSession } from 'next-auth/react';

export const Navbar = () => {
  const session = useSession();

  return (
    <div className="flex justify-between w-full">
      <Button variant='link' asChild>
        <Link href='/'>Home</Link>
      </Button>
      <div className="flex gap-4 place-items-center">
        <ThemeToggle />
        {session.status === "authenticated" ? 
          <Profile /> : 
          <Button variant='outline' asChild>
            <Link href='/api/auth/signin'>Sign in</Link>
          </Button>
        }
      </div>
    </div>
  )
};