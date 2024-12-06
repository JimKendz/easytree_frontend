import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { FormCard } from "./formCard"
import React from "react"
import { Calendar } from "../ui/calendar"

type TournamentAccessData = {
    date: Date
    visability: boolean
    isLoading: boolean
}

type TournamentAccessFormProps = TournamentAccessData & {
    updateData: (data: Partial<TournamentAccessData>) => void
}

export function TournamentAccessForm({ date, visability, isLoading, updateData }: TournamentAccessFormProps) {
    return (
        <FormCard title={"Tournament Access"} description={""}>
            <div className="grid md:gap-10 md:grid-cols-2">
                <div className="grid">
                    <Label htmlFor="visability" className="text-md ml-1 mb-3">Visability*</Label>
                    <Select
                        value={visability + ""}
                        required={true}
                        onValueChange={(value) => value === "true" ? updateData({ visability: true }) : updateData({ visability: false })}
                        disabled={isLoading} >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="true">Public</SelectItem>
                            <SelectItem value="false" disabled>Private (coming soon)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid mt-7 md:mt-0">
                    <Label htmlFor="date" className="text-md ml-1 mb-3">Date</Label>
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
                        <PopoverContent className="w-auto p-4">
                            <Calendar
                                mode="single"
                                required={true}
                                selected={date}
                                onSelect={e => updateData({ date: e })}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </ FormCard>
    )
}