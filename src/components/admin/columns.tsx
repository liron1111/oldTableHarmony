'use client'

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
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
    header: 'avatar',
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.getValue('image')} alt='profile' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )
    }
  },
  {
    accessorKey: 'id',
    header: 'id',
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return sortableColumn({ column });
    }
  },
  {
    accessorKey: 'password',
    header: 'password',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return sortableColumn({ column });
    }
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return sortableColumn({ column });
    },
  },
  {
    accessorKey: 'actions',
    cell: ({ row }) => {
      return actionsColumn({ row });
    }
  }
];

export const account: ColumnDef<Account>[] = [
  checkboxColumn(),
  {
    accessorKey: 'id',
    header: 'id',
  },
  {
    accessorKey: 'type',
    header: 'type',
  },
  {
    accessorKey: 'provider',
    header: ({ column }) => {
      return sortableColumn({ column });
    },
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
    header: ({ column }) => {
      return sortableColumn({ column });
    },
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
  },
];

function checkboxColumn<TData>() {
  return (
    {
      id: 'select', 
      header: ({ table } : { table: Table<TData> }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row } : { row: Row<TData> }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
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
          <DotsHorizontalIcon className="h-4 w-4" />
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