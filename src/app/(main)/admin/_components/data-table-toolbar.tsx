import { Table } from "@tanstack/react-table"
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFilter } from "./data-table-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <header className="flex items-center justify-between">
      <DataTableFilter table={table} />
      <DataTableViewOptions table={table} />      
    </header>
  )
}