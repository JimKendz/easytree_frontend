import { Table } from "@tanstack/react-table"
import { Input } from "../ui/input"
import { DataTableFacetedFilter } from "./dataTableFacetedFilter"
import { states } from "@/app/data/data"
import { Button } from "../ui/button"
import { Cross2Icon, UpdateIcon } from "@radix-ui/react-icons"
import { DataTableViewOptions } from "../ui/columnToggle"
import { TOURNAMENTSTATE } from "@/app/Resources"
import action from "@/app/actions"
import { useRouter } from 'next/navigation'

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    defaultState? : string
  }
  
export function TableToolbar<TData>({
    table,
    defaultState
  }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
  return(
    <div className="flex items-center py-4">
        <Input
        placeholder="Filter tournaments..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
        className="max-w-sm" 
        errorMessage={"Filter failed"}        />
         <div className="mx-2" />
        {table.getColumn("tournamentState") && (
          <DataTableFacetedFilter
            column={table.getColumn("tournamentState")}
            title="State"
            options={states}
            defaultSelectedValue={defaultState}
          />
        )}
         {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
         <DataTableViewOptions table={table} />
      </div>
      )
    }