'use client'

import { Button, buttonVariants } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { deleteTournament } from "@/app/api/tournament/route";
import { useRouter } from "next/navigation";
 
export function DeleteButton(tournamentID: any) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    
    async function callDeleteTournament(tournamentID: any) {
        setIsLoading(true)
        const del = await deleteTournament(tournamentID!)
        toast({
          title: "Tournament deleted",
        })
        setIsLoading(false)
        setShowDeleteDialog(false)
        //router.push(`/`)
      }

  return(
    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogTrigger className={buttonVariants({ variant: "destructive" })}>Delete Tournament</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription className="pt-6 pb-2">
                    This action cannot be undone and will permanently delete your tournament
                    removing its data from our servers.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
            <Button
                type="button"
                onClick={() => callDeleteTournament(tournamentID)}
                className="w-40"
                disabled={isLoading}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Delete
              </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}