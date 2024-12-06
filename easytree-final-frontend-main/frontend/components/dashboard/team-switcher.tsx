"use client"

import * as React from "react"
import {
  CaretSortIcon,
  CheckIcon,
  CircleIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TournamentResource, TournamentsResource } from "@/app/Resources"
import { getMyTournamentsAdmin } from "@/app/api/tournament/route"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
  const [selectedTournament, setSelectedTournament] = React.useState<TournamentResource | null>(null)
  const [myTournaments, setMyTournaments] = React.useState<TournamentsResource | null>(null);
  async function load() {
    console.log("in load()")
    const t = await getMyTournamentsAdmin();
    console.log("load(): ", t)
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
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                //src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
                //alt={selectedTeam.label}
              />
              <AvatarFallback>{myTournaments.tournaments[0].name.charAt(0)}</AvatarFallback>
            </Avatar>
            {myTournaments.tournaments[0].name}
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
                  <CommandGroup key={tournament.id} heading={tournament.name}>
                          <CommandItem
                      key={tournament.id}
                      onSelect={() => {
                        window.location.href= `/tournamentDashboard/${tournament.id}`
                        //setSelectedTeam(team)
                        setOpen(false)
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                     
                        <AvatarFallback>{myTournaments.tournaments[0].name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    <p>{tournament.tags.join(', ')}</p>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedTournament?.id === tournament.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
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
                      window.location.href= `/tournaments`
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
                      window.location.href= `/createTournament`
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