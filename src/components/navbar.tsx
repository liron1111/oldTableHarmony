'use client'

import Link from 'next/link';
import { ThemeToggle } from './theme/toggle';
import { Button } from './ui/button';
import { Profile } from './profile';
import { useSession } from 'next-auth/react';
import { Search } from './search';
import { useCurrentUser } from '@/hooks/use-current-user';

export const Navbar = () => {
  const user = useCurrentUser();

  return (
    <div className="flex justify-between w-full">
      <Button variant='link' asChild>
          <Link href='/'>Home</Link>
      </Button>
      <Search />
      <div className="flex gap-2 items-center">
        <ThemeToggle />
        {user ? <Profile /> : (
          <Button variant='outline' asChild>
            <Link href='/api/auth/signin'>Sign in</Link>
          </Button>
        )}
      </div>
    </div>
  )
};