import { Input } from "../ui/input";
import React from "react";

type TagsInputProps = {
    tagss: string[]
}

type TagsInputFormProps = TagsInputProps & {
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    updateData?: (data: Partial<TagsInputProps>) => void
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}

export function TagsInput({ tagss, updateData, onChange, onSubmit, onKeyDown }: TagsInputFormProps) {
    const [selected, setSelected] = React.useState(["Hallo", "was geht"])

    function addTag(e: any) {
        if (e.target.value !== "") {
            setSelected([...selected, e.target.value])
            e.target.value = ""
        }
    }

    function deleteTag(index: number) {
        setSelected(selected.filter((_, i) => i !== index))
    }

    return (
        <div className="grid">
            <ul className="flex gap-2">
                {
                    selected.map((tag, index) => (
                        <li key={index}>
                            <span className="flex px-2 py-1 mb-2 border-solid border-black">
                                {tag}
                                <span className="flex ml-3 hover:text-red-600" onClick={() => deleteTag(index)}>X</span>
                            </span>
                        </li>
                    ))}
            </ul>
            <Input
                className="flex-grow"
                type="text"
                placeholder="Press enter to add tags"
                onKeyUp={e => e.key === "Enter" ? addTag(e) : null}
            />    
        </div>
    )
}