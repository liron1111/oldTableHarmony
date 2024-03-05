'use client'

import { 
  User, 
  Account,
  Server
} from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableRowActions } from '@/components/admin/data-table-row-actions';
import { DataTableColumnHeader } from '@/components/admin/data-table-column-header';

export const user: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
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
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: 'password',
    header: 'password',
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  }
];

export const account: ColumnDef<Account>[] = [
  {
    id: "select",
    header: ({ table }) => (
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
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="provider" />
    ),
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="expires_at" />
    ),
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

export const server: ColumnDef<Server>[] = [
  {
    accessorKey: 'id',
    header: 'id',
    enableHiding: false,
  },
]