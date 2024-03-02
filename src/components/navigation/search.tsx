"use client"

import { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Button } from "../ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useCurrentRole } from "@/hooks/use-current-role";
import Link from "next/link";
import { UserRole } from "@prisma/client";
import { models } from "@/lib/admin";

export const Search = () => {
  const [open, setOpen] = useState(false);
  const role = useCurrentRole();

  const Item = ({ title, to } : { title: string, to: string }) => {
    return (
      <Link href={to} onClick={() => setOpen(false)}>
        <CommandItem className='capitalize'>
          {title}
        </CommandItem>
      </Link>
    );
  }

  return (
    <>
      <Button variant="outline" className="w-[400px]" onClick={() => setOpen(true)}>
        <MagnifyingGlassIcon className="mr-2 w-4 h-4" />
        Search
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Public pages">
            <Item title='home' to='/' />
            <Item title='information' to='/information' />
          </CommandGroup>
          {role && (
            <CommandGroup heading="Social pages">
              <Item title='servers' to='/servers' />
            </CommandGroup>
          )}
          {role === UserRole.ADMIN && (
            <CommandGroup heading="Admin">
              {models.map(model => (
                <Item key={model} title={model} to={`/admin/${model}`} />
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
