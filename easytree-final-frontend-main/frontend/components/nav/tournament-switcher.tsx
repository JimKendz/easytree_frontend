"use client"

import * as React from "react"
import {
  CaretSortIcon,
  CircleIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TournamentResource, TournamentsResource } from "@/app/Resources"
import { getMyTournamentsAdmin } from "@/app/api/tournament/route"
import { useRouter } from "next/navigation"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TournamentSwitcherProps extends PopoverTriggerProps {}

export default function TournamentSwitcher({ className }: TournamentSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
  const [selectedTournament, setSelectedTournament] = React.useState<TournamentResource | null>(null)
  const [myTournaments, setMyTournaments] = React.useState<TournamentsResource | null>(null);
  const router = useRouter()
  async function load() {
    const t = await getMyTournamentsAdmin();
    setMyTournaments(t);
}
React.useEffect(() => { load(); }, []);

  return (
    <div>
{myTournaments?.tournaments[0] ?
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[300px] justify-between", className)}
          >
            {"Jump to Tournament"}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search for tournaments..." />
              <CommandEmpty>No tournament found.</CommandEmpty>
              { myTournaments ?
                myTournaments?.tournaments.map((tournament) =>(
                  <CommandGroup key={tournament.id}>
                    <CommandItem className="text-sm" title="Title"
                    key={tournament.id}
                    onSelect={() => {
                      router.push(`/tournamentDashboard/${tournament.id}`)
                      
                      //setSelectedTeam(team)
                      setOpen(false)
                    }}>
                      <Label>{tournament.name}</Label>

                    </CommandItem>
                </CommandGroup>
                )): null}
              
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewTeamDialog(true)
                      router.push(`/tournaments`)
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Join Tournament
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
            <CommandSeparator />   
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewTeamDialog(true)
                      router.push(`/createTournament`)
                    }}
                  >
                    <CircleIcon className="mr-2 h-5 w-5" />
                    Create Tournament
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>     
    </Dialog>
    : null}
    </div>
  )
}