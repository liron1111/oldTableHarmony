'use client'

import { DotsVerticalIcon } from "@radix-ui/react-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from '../ui/button';
import { 
  User, 
  Account,
} from '@prisma/client';
import { 
  ColumnDef, 
  Column,
  Row,
  Table,
} from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Checkbox } from '../ui/checkbox';

export const user: ColumnDef<User>[] = [
  checkboxColumn(),
  {
    accessorKey: 'image',
    header: '',
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.getValue('image')} alt='profile' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'id',
    header: 'id',
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: sortableColumn,
  },
  {
    accessorKey: 'password',
    header: 'password',
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: sortableColumn,
  },
  {
    accessorKey: 'emailVerified',
    header: 'emailVerified',
    cell: ({ row }) => {
      return (new Date(row.getValue('emailVerified'))).toLocaleDateString('en-GB');
    },
    enableSorting: false,
  },
  {
    accessorKey: 'isTwoFactorEnabled',
    header: 'isTwoFactorEnabled',
    enableSorting: false,
  },
  {
    accessorKey: 'role',
    header: 'role',
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      return actionsColumn({ row });
    },
    enableSorting: false,
    enableHiding: false,
  }
];

export const account: ColumnDef<Account>[] = [
  checkboxColumn(),
  {
    accessorKey: 'id',
    header: 'id',
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: 'type',
  },
  {
    accessorKey: 'provider',
    header: sortableColumn,
  },
  {
    accessorKey: 'providerAccountId',
    header: 'providerAccountId',
  },
  {
    accessorKey: 'refresh_token',
    header: 'refresh_token',
  },
  {
    accessorKey: 'access_token',
    header: 'access_token',
  },
  {
    accessorKey: 'expires_at',
    header: sortableColumn,
    cell: ({ row }) => {
      return (new Date(row.getValue('expires_at'))).toLocaleDateString('en-GB');    
    }
  },
  {
    accessorKey: 'token_type',
    header: 'token_type',
  },
  {
    accessorKey: 'scope',
    header: 'scope',
  },
  {
    accessorKey: 'id_token',
    header: 'id_token',
  },
  {
    accessorKey: 'session_state',
    header: 'session_state',
  },
  {
    accessorKey: 'userId',
    header: 'userId',
    enableHiding: false,
  },
];

function checkboxColumn<TData>() {
  return (
    {
      id: "select",
      header: ({ table } : { table: Table<TData> }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row } : { row: Row<TData> }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }
  )
}

function sortableColumn<TData>({ column } : { column: Column<TData> }) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {column.id}
      <CaretSortIcon className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function actionsColumn<TData>({ row }: { row: Row<TData> }) {
  const originalRow = row;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsVerticalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Switch Role</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}