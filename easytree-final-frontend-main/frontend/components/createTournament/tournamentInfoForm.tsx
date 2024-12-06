import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { FormCard } from "./formCard"
import { TagsInput } from "react-tag-input-component";
import "./styles.css";

type TournamentData = {
    name: string
    description: string
    tags: string[]
    isLoading: boolean
}

type TournamentInfoFormProps = TournamentData & {
    updateData: (data: Partial<TournamentData>) => void
}

export function TournamentInfoForm({ name, description, tags, isLoading, updateData }: TournamentInfoFormProps) {
    return (
        <FormCard title={"Tournament Information"} description={"Please enter your tournament information."}>
            <div className="grid">
                <Label htmlFor="name" className="text-md ml-1 mb-3">Name*</Label>
                <Input
                    type="text"
                    value={name}
                    required={true}
                    minLength={3}
                    placeholder="Name your tournament"
                    errorMessage="Tournamentname needs at least 3 characters"
                    onChange={e => updateData({ name: e.target.value })}
                    disabled={isLoading} />
            </div>
            <div className="grid mt-7">
                <Label htmlFor="description" className="text-md ml-1 mb-3">Description</Label>
                <Textarea
                    value={description}
                    placeholder="What can the participants expect?"
                    onChange={e => updateData({ description: e.target.value })}
                    disabled={isLoading}
                />
            </div>
            <div className="grid mt-7">
                <Label htmlFor="tags" className="text-md ml-1 mb-3">Tags</Label>
                <TagsInput
                    classNames={{ tag: "dark:text-white dark:bg-border", input: "dark:text-white" }}
                    value={tags}
                    onChange={e => updateData({ tags: [...e] })}
                    placeHolder="Press enter to add tags"
                />
            </div>
        </ FormCard>
    )
}