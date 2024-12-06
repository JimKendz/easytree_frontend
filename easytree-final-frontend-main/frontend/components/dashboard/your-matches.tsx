'use client'

import * as React from "react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
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
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
  
const exampleGroupMatches: exampleMatches = [
      {
        label: "vs Werder Bremen",
        description: "Group C",
        result: "Win",
        value: "c-1",
        short: "GP",
      },
      {
        label: "vs Alba Berlin",
        description: "Group C",
        result: "Loss",
        value: "c-2",
        short: "GP",
      },
      {
        label: "vs Fnatic",
        description: "Group C",
        result: "Active",
        value: "c-3",
        short: "GP",
      },
      {
        label: "vs Füchse Berlin",
        description: "Group C",
        result: "Active",
        value: "c-4",
        short: "GP",
      },
      {
        label: "vs Team Turbo",
        description: "Group C",
        result: "Active",
        value: "c-5",
        short: "GP",
      },
]

const exampleKoMatches: exampleMatches = [
      {
        label: "vs Borussia Dortmund",
        description: "Round of 16",
        result: "Win",
        value: "ro16-7",
        short: "16",
      },
      {
        label: "vs SC Freiburg",
        description: "Quarterfinals",
        result: "Active",
        value: "qf-3",
        short: "QF",
      },
      {
        label: "vs Winner of QF4",
        description: "Semifinals",
        result: "TBD",
        value: "sf-1",
        short: "SF",
      },
      {
        label: "vs Winner of SF2",
        description: "Final",
        result: "TBD",
        value: "final",
        short: "F",
      },
]

type exampleMatches = {
  label: string;
  description: string;
  result: string;
  value: string;
  short: string;
}[];

export function YourMatches() {
    const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)

    return (
      <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
        <div className="space-y-8">
          {exampleGroupMatches.map((match: exampleMatches[number]) => (
            <div key={match.value} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>{match.short}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{match.label}</p>
                <p className="text-sm text-muted-foreground">{match.description}</p>
              </div>
              
              {match.result == "Active" ?    
                <div className="ml-auto font-medium">
                  <Button onClick={() => {
                    setShowNewTeamDialog(true)
                  }}>
                  Enter result
                  </Button>
                </div>
                : match.result == "Win" ?
                <div className="ml-auto text-green-600 font-medium">Win</div>
                : match.result == "Loss" ?
                <div className="ml-auto text-red-600 font-medium">Loss</div>
                : <div className="ml-auto font-medium">{match.result}</div>
              }
            </div>
          ))}
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter the result</DialogTitle>
            <DialogDescription>
              Group Phase match vs Team Turbo
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="plan">Winner</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a winner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">
                      <span className="font-medium">Team A</span>
                    </SelectItem>
                    <SelectItem value="b">
                      <span className="font-medium">Team B</span> 
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Result</Label>
                <Label htmlFor="pointsTeamA" className="hidden">Result</Label>
                <Input id="pointsTeamA" type="number" placeholder="Points Team A" errorMessage={""} onChange={undefined} />
                <Label htmlFor="pointsTeamB" className="hidden">Result</Label>
                <Input id="pointsTeamB" type="number" placeholder="Points Team B" errorMessage={""} onChange={undefined} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    )
  }