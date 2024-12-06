import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons"
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"
import { useSession } from 'next-auth/react';
import { BlockResource, BlocksResource } from "@/app/Resources";
import { addScore } from "@/app/api/tournament/route";

export function BlockGroupDialogWrapper({
    children,
    blocks,
    //router,
    //tournamentID,
    admins
  }: {
    children: React.ReactNode,
    blocks: any,
    //router: any,
    //tournamentID: any
    admins: String[]|undefined
  }) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showAddScoresDialog, setShowAddScoresDialog] = useState(false)
    const { toast } = useToast()
    const { data: session } = useSession();
    async function submitScores(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()
      setIsLoading(true)
  
      try {
        // Iterate through each block and get the score from the input
        blocks.forEach(async (block: BlockResource) => {
          const inputElement = document.getElementById(`score-${block.id}`) as HTMLInputElement;
          const score = parseInt(inputElement.value, 10);
  
          // Check if the score is a valid number
          if (!isNaN(score)) {
            // Call the addScore function for each block
            const result = await addScore(block.id ?? '', score);
  
            block.score = score
          }
  
        });
      } catch (error) {
        console.error(error);
      }
  
      setIsLoading(false)
      setShowAddScoresDialog(false)
      toast({
        title: "Scores got added",
        description: "Thank you for submitting!",
      })
    }
  
    return (
      <Dialog open={showAddScoresDialog} onOpenChange={setShowAddScoresDialog}>
        {blocks[0].blockState == 'onGoing' && admins?.includes(session?.user.id!)  ?
          <DialogTrigger className="flex flex-col justify-center align-center space-y-1">
            {children}
          </DialogTrigger>
          : <div className="flex flex-col justify-center align-center space-y-1">{children}</div>}
        <form onSubmit={submitScores}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Add score</DialogTitle>
              <DialogDescription>
                Insert the score. Click submit when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col justify-center align-center space-y-4">
              {blocks.map((block: BlockResource) => (
                <div key={block.id} className="flex flex-row justify-between">
                  <Label htmlFor={`score-${block.id}`} className="self-center">
                    {block.name}
                  </Label>
                  <Input
                    id={`score-${block.id}`}
                    defaultValue={block.score}
                    type="number"
                    min="0"
                    className="w-20" errorMessage={''} onChange={undefined} />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default button click behavior
                  submitScores(e as unknown as React.FormEvent<HTMLFormElement>);
                }}
                className="w-40"
                disabled={isLoading}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    );
  }