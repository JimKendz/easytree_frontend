import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { FormCard } from "./formCard"

type TournamentSystemData = {
    system: number
    perMatch?: number
    total?: number
    isLoading: boolean
}
type TournamentSystemFormProps = TournamentSystemData & {
    updateData: (data: Partial<TournamentSystemData>) => void
}
export function TournamentSystemForm({ system, perMatch, total, isLoading, updateData }: TournamentSystemFormProps) {
    return (
        <FormCard title={"Tournament System"} description={""}>
            <div className="grid">
                <Label htmlFor="system" className="text-md ml-1 mb-3">System*</Label>
                <Select
                    defaultValue={String(system)}
                    onValueChange={(value) => updateData({ system: Number(value) })}
                    disabled={isLoading} >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">K.O. Phase</SelectItem>
                        <SelectItem value="2" disabled>Group Phase (coming soon)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid md:gap-10 md:grid-cols-2">
                <div className="grid mt-7">
                    <Label htmlFor="perMatch" className="text-md ml-1 mb-3">Participants per Match*</Label>
                    <Select
                        value={perMatch + ""}
                        required={true}
                        onValueChange={(value) => updateData({ perMatch: Number(value) })}
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
                <div className="grid mt-7">
                    <Label htmlFor="total" className="text-md ml-1 mb-3">Total Participants*</Label>
                    <Select
                        value={total + ""}
                        required={true}
                        onValueChange={(value) => updateData({ total: Number(value) })}
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
            </div>
        </ FormCard>
    )
}