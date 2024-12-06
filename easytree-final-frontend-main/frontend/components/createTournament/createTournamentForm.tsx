"use client"

import React, { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { useMultistepForm } from "@/components/createTournament/useMultistepForm";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { TournamentInfoForm } from "./tournamentInfoForm";
import { TournamentSystemForm } from "./tournamentSystemForm";
import { TournamentAccessForm } from "./tournamentAccessForm";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createTournament } from "@/app/api/tournament/route";

interface CreateTournamentFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type FormData = {
    name: string
    system: number
    visability: boolean
    date: Date
    tags: string[]
    total: number | undefined
    perMatch: number | undefined
    description: string
    isLoading: boolean
}
const DATA: FormData = {
    name: "",
    system: 1,
    visability: true,
    date: new Date(),
    tags: [],
    total: undefined,
    perMatch: undefined,
    description: "",
    isLoading: false
}

export function CreateTournamentForm({ className, ...props }: CreateTournamentFormProps) {
    const { data: session } = useSession();
    const router = useRouter()
    const [data, setData] = useState(DATA)
    function updateData(data: Partial<FormData>) {
        setData(prev => {
            return { ...prev, ...data }
        })
    }
    const { steps, currentStep, step, isFirstStep, isLastStep, next, back, goTo } = useMultistepForm([
        <TournamentInfoForm key="info" {...data} updateData={updateData} />,
        <TournamentSystemForm key="system" {...data} updateData={updateData} />,
        <TournamentAccessForm key="access" {...data} updateData={updateData} />
    ])

    async function onSubmit(e: FormEvent) {
        e.preventDefault()
        if (!isLastStep && !(data.total === undefined || data.perMatch === undefined)) {
            return next()
        } else if (data.total === undefined || data.perMatch === undefined) {
            return goTo(1)
        }
        setData({ ...data, isLoading: true })
      /*  const res = await fetch("/api/tournament", {
            method: 'POST',
            body: JSON.stringify({
                name: data.name,
                description: data.description,
                startDate: data.date,
                totalParticipants: data.total,
                participantsPerMatch: data.perMatch,
                visability: data.visability,
                tournamentSystem: data.system,
                tags: data.tags,
                admins: []
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.user.access_token}`
            }
        }) */
        createTournament(data.name,data.description,data.visability, data.date, data.tags, data.total,data.perMatch, data.system).then((res) => {
        if (!res) {
            toast.error("Failed to create tornament")
        } else {
            toast.success("Created tournament")
            router.push(`/tournamentDashboard/${res.id}`)
        }
        setData({ ...data, isLoading: false })
    })
    }
    return (
        <div className={cn(className)} {...props}>
            <form onSubmit={onSubmit} onKeyDown={e => e.key === "Enter" ? e.preventDefault() : null}>
                <Card className="p-3">
                    <div className="flex justify-end mt-4 mr-6">{currentStep + 1} / {steps.length}</div>
                    {step}
                    <div className="flex justify-end gap-3 mb-4 mr-6">
                        {!isFirstStep && (
                            <Button type="button" variant={"secondary"} onClick={back}>Back</Button>
                        )}
                        <Button type="submit" disabled={data.isLoading}>
                            {isLastStep ? "Create" : "Next"}
                        </Button>
                        <Toaster />
                    </div>
                </Card>
            </form>
        </div>
    )
}