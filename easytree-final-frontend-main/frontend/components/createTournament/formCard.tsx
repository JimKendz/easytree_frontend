import { ReactNode } from "react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

type FormCardProps = {
    title: string
    description: string
    children: ReactNode
}

export function FormCard({ title, description, children }: FormCardProps) {
    return (
        <>
            <CardHeader>
                <CardTitle className="text-3xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <div className="p-5">
                <CardContent>
                    {children}
                </CardContent>
            </div>
        </>
    )
}