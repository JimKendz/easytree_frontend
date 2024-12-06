"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { BlockGroupDialogWrapper } from './blockgroup-wrapper'
import { BlockUnit } from './block'
import { BlockResource, BlocksResource } from "@/app/Resources";
//import { useSession } from 'next-auth/react';

type round = { [key: string]: BlockResource[] }

export function KoRoundColumn({ koRoundGrouped, admins, session, roundName }: { koRoundGrouped: round | null, admins:  String[] | undefined, session: any, roundName: string }) {
    //const { data: session } = useSession();

  return (
    <>
        {Object.keys(koRoundGrouped ?? {}).some(groupName => (koRoundGrouped ?? {})[groupName].length > 0) ? (
            <div className="flex flex-col w-full">
            <div className="flex justify-center mb-6">
                <p className="text-2xl text-primary align-top">{roundName}</p>
            </div>

            <div className="flex flex-col justify-center align-center h-full w-full space-y-10">
                {Object.entries(koRoundGrouped ?? {}).map(([groupId, blocks]: [string, BlockResource[]]) => (
                <div key={groupId} className="flex flex-col justify-center align-center">
                    <BlockGroupDialogWrapper 
                        blocks={blocks} 
                        //router={router} 
                        //tournamentID={tournamentID} 
                        admins={admins}
                        >
                        {blocks.map((block: BlockResource) => (
                            <div key={block.id} className='w-full'>
                                {admins?.includes(session?.user.id!) && block.blockState == "onGoing" ?
                                    <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className='w-full'>
                                            <BlockUnit blockData={block} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                        <p>Click to submit scores</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    </TooltipProvider>
                                    : <BlockUnit blockData={block} />
                                }
                            </div>
                        ))}
                    </BlockGroupDialogWrapper>
                </div>
                ))}
            </div>
            </div>
        ) : null} 
      </>
  )
}