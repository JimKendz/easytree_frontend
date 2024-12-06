"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { TagsInput } from "react-tag-input-component";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface CreateTournamentFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function CreateTournamentForm({ className, ...props }: CreateTournamentFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [name, setName] = useState("")
  const [system, setSystem] = useState<number>(1)
  const [visability, setVisability] = useState<boolean>(true)
  const [date, setDate] = useState<Date>()
  const [selected, setSelected] = useState(["Match"]);
  const [total, setTotal] = useState<number>()
  const [perMatch, setPerMatch] = useState<number>()
  const [description, setDescription] = useState("")
  const { data: session } = useSession();
  const router = useRouter()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const res = await fetch("/api/tournament", {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        description: description,
        date: date,
        totalParticipants: total,
        participantsPerMatch: perMatch,
        visability: visability,
        tournamentSystem: system,
        tags: selected,
        admins: []
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user.access_token}`
      }
    })
    const response = await res.json()

    console.log("create-tournament-form response: ", response);

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    router.refresh()
    router.push('/myTournaments')
  }

  return (
    <div className={cn(className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="items-center gap-6 rounded-lg p-5 mx-auto max-w-7xl">
          <Card >
            <CardHeader>
              <CardTitle>Create your Tournament</CardTitle>
              <CardDescription>Please enter your tournament information.</CardDescription>
            </CardHeader>
            <div className="grid grid-flow-row p-5 md:grid-cols-2 ">
              <CardContent className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    value={name}
                    required={true}
                    minLength={3}
                    placeholder="Name your tournament"
                    errorMessage="Tournamentname needs at least 3 characters"
                    onChange={e => setName(e.target.value)}
                    disabled={isLoading} />
                </div>

                <div className="grid gap-4">
                  <Label htmlFor="system">Tournament System</Label>
                  <Select
                    defaultValue={String(system)}
                    onValueChange={(value) => setSystem(Number(value))}
                    disabled={isLoading} >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">K.O. Phase</SelectItem>
                      <SelectItem value="2" disabled>Group Phase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    value={description}
                    placeholder="What can the participants expect?"
                    onChange={e => setDescription(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </CardContent>

              <CardContent className="grid gap-6">
                <div className="grid gap-4">
                  <Label htmlFor="visability">Visability</Label>
                  <Select
                    value={"True"}
                    defaultValue={"True"}
                    onValueChange={(value) => value == "True" ? setVisability(true) : setVisability(false)}
                    disabled={isLoading} >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="True">Public</SelectItem>
                      <SelectItem value="False">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

               {/*  <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div> */}

                <div className="grid gap-4">
                  <Label htmlFor="perMatch">Participants per Match</Label>
                  <Select
                    required={true}
                    onValueChange={(value) => setPerMatch(Number(value))}
                    disabled={isLoading} >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="9">9</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4">
                  <Label htmlFor="total">Total Participants</Label>
                  <Select
                    // defaultValue={size}
                    required={true}
                    onValueChange={(value) => setTotal(Number(value))}
                    disabled={isLoading || perMatch === undefined} >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={(Math.pow(perMatch!, 1).toString())}>{Math.pow(perMatch!, 1)}</SelectItem>
                      <SelectItem value={(Math.pow(perMatch!, 2).toString())}>{Math.pow(perMatch!, 2)}</SelectItem>
                      <SelectItem disabled={perMatch! >= 5} value={(Math.pow(perMatch!, 3).toString())}>{Math.pow(perMatch!, 3)}</SelectItem>
                      <SelectItem disabled={perMatch! >= 4} value={(Math.pow(perMatch!, 4).toString())}>{Math.pow(perMatch!, 4)}</SelectItem>
                      <SelectItem disabled={perMatch! >= 3} value={(Math.pow(perMatch!, 5).toString())}>{Math.pow(perMatch!, 5)}</SelectItem>
                      <SelectItem disabled={perMatch! >= 3} value={(Math.pow(perMatch!, 6).toString())}>{Math.pow(perMatch!, 6)}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4">
                  <Label htmlFor="tags">Tags</Label>
                  <TagsInput
                    classNames={{ tag: "bg-primary", input: "" }}
                    value={selected}
                    onChange={setSelected}
                    placeHolder="Enter Tags"
                  />
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </form >
      <div className="px-10 py-5 mb-4">
        <Button onClick={onSubmit} className="w-40" disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Create
        </Button>
      </div>
    </div >
  )
}