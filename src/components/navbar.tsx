'use client'

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Profile } from '@/components/profile';
import { Search } from '@/components/search';
import { useCurrentUser } from '@/hooks/use-current-user';

export const Navbar = () => {
  const user = useCurrentUser();

  return (
    <div className="flex justify-between w-full bg-primary-foreground p-2">
      <Button variant='link' asChild>
        <Link href='/'>Home</Link>
      </Button>
      <Search />
      <div className="flex gap-2 items-center">
        <ThemeToggle />
        {user ? <Profile /> : (
          <Button variant='outline' asChild>
            <Link href='/api/auth/signin'>Login</Link>
          </Button>
        )}
      </div>
    </div>
  )
};