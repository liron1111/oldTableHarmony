'use client'

import { Table } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  MixerVerticalIcon, 
} from "@radix-ui/react-icons";
import { useState } from "react"

interface DataTableFilterProps<TData> {
  table: Table<TData>
}

export function DataTableFilter<TData>({
  table,
}: DataTableFilterProps<TData>) {
  const [filterColumn, setFilterColumn] = useState('id');

  return (
    <div className="flex gap-2 w-full">
      <Input
        placeholder={`Filter by ${filterColumn}...`}
        value={(table.getColumn(`${filterColumn}`)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(`${filterColumn}`)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>
            <MixerVerticalIcon className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={filterColumn} onValueChange={setFilterColumn}>
            {table
              .getAllColumns()
              .filter(column => column.getCanSort())
              .map(column => {
                return (
                  <DropdownMenuRadioItem
                    key={column.id}
                    className='capitalize'
                    value={column.id}
                  >
                    {column.id}
                  </DropdownMenuRadioItem>
                )
              })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}