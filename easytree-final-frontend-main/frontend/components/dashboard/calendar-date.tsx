"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function CalendarDate({ 
  tournamentDate,
}: { tournamentDate: Date }) {

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[200px] justify-start text-left font-normal",
              !tournamentDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {tournamentDate ? format(tournamentDate, "PPP") : 
              <span>Date of tournament</span>
            }
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="single"
            //defaultMonth={date?.from}
            selected={tournamentDate}
            //editable={false}
            //onSelect={undefined}
            //numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}