"use client";

import { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { nextDepth } from "@/app/api/tournament/route";
import { BlockResource, BlocksResource } from "@/app/Resources";
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { useSession } from 'next-auth/react';
import { KoRoundColumn } from './koRound-column';
import Image from 'next/image';

interface Rounds {
  round6Blocks: BlockResource[];
  round5Blocks: BlockResource[];
  round4Blocks: BlockResource[];
  quarterfinalBlocks: BlockResource[];
  semifinalBlocks: BlockResource[];
  finalBlocks: BlockResource[];
  winnerBlock: BlockResource[];
}
type groupedRounds = { [key: string]: round }
type round = { [key: string]: BlockResource[] }

export async function KoBracket({ koPhaseblockData, tournamentID, koPhaseID, participants, admins }: { koPhaseblockData: BlocksResource, tournamentID: any, koPhaseID: any, participants: any, admins: String[] | undefined }) {
  const router = useRouter()
  const { data: session } = useSession();
  const { toast } = useToast()
  const rounds: Rounds = useMemo(() => {
    return {
      round10Blocks: koPhaseblockData.blocks.filter((block) => block.depth == 10),
      round9Blocks: koPhaseblockData.blocks.filter((block) => block.depth == 9),
      round8Blocks: koPhaseblockData.blocks.filter((block) => block.depth == 8),
      round7Blocks: koPhaseblockData.blocks.filter((block) => block.depth == 7),
      round6Blocks: koPhaseblockData.blocks.filter((block) => block.depth == 6),
      round5Blocks: koPhaseblockData.blocks.filter((block) => block.depth == 5),
      round4Blocks: koPhaseblockData.blocks.filter((block) => block.depth == 4),
      quarterfinalBlocks: koPhaseblockData.blocks.filter((block) => block.depth == 3),
      semifinalBlocks: koPhaseblockData.blocks.filter((block) => block.depth == 2),
      finalBlocks: koPhaseblockData.blocks.filter((block) => block.depth == 1),
      winnerBlock: koPhaseblockData.blocks.filter((block) => block.depth == 0),
    };
  }, [koPhaseblockData]);

  // Gruppierung für jede Runde durchführen
  const groupedRounds: groupedRounds = useMemo(() => {
    const groupedRounds: groupedRounds = {};
    Object.keys(rounds).forEach((roundKey) => {
      groupedRounds[roundKey as keyof Rounds] = groupByNext(rounds[roundKey as keyof Rounds]);
    });
    return groupedRounds;
  }, [rounds]);

  const [round10Grouped, setRound10Grouped] = useState<round | null>(null);
  const [round9Grouped, setRound9Grouped] = useState<round | null>(null);
  const [round8Grouped, setRound8Grouped] = useState<round | null>(null);
  const [round7Grouped, setRound7Grouped] = useState<round | null>(null);
  const [round6Grouped, setRound6Grouped] = useState<round | null>(null);
  const [round5Grouped, setRound5Grouped] = useState<round | null>(null);
  const [round4Grouped, setRound4Grouped] = useState<round | null>(null);
  const [quarterfinalGrouped, setQuarterfinalGrouped] = useState<round | null>(null);
  const [semifinalGrouped, setSemifinalGrouped] = useState<round | null>(null);
  const [finalGrouped, setFinalGrouped] = useState<round | null>(null);
  const [winnerGrouped, setWinnerGrouped] = useState<round | null>(null);

  useEffect(() => {
    setRound10Grouped(groupedRounds['round10Blocks']);
    setRound9Grouped(groupedRounds['round9Blocks']);
    setRound8Grouped(groupedRounds['round8Blocks']);
    setRound7Grouped(groupedRounds['round7Blocks']);
    setRound6Grouped(groupedRounds['round6Blocks']);
    setRound5Grouped(groupedRounds['round5Blocks']);
    setRound4Grouped(groupedRounds['round4Blocks']);
    setQuarterfinalGrouped(groupedRounds['quarterfinalBlocks']);
    setSemifinalGrouped(groupedRounds['semifinalBlocks']);
    setFinalGrouped(groupedRounds['finalBlocks']);
    setWinnerGrouped(groupedRounds['winnerBlock']);
  }, [groupedRounds]);

  // If koPhaseblockData or koPhaseblockData.blocks is undefined, return Error Message.
  if (!koPhaseblockData || !koPhaseblockData.blocks) {
    return (
      <div>
        <p style={{ color: "red", fontWeight: "bold" }}>
          Error: Unable to fetch bracket data.
        </p>
      </div>
    );
  }

  // Funktion zur Gruppierung der Arrays nach dem Wert von "next"
  function groupByNext(blocks: BlockResource[]): { [key: string]: BlockResource[] } {
    const groupedBlocks: { [key: string]: BlockResource[] } = {};

    blocks.forEach((block) => {
      const nextValue = block.next || ''; // Falls "next" undefined ist, leeres String verwenden
      if (!groupedBlocks[nextValue]) {
        groupedBlocks[nextValue] = [];
      }
      groupedBlocks[nextValue].push(block);
    });

    return groupedBlocks;
  }

  async function callNextDepth() {
    const next = await nextDepth(koPhaseID!)
    toast({
      title: "Next Phase",
      description: "Lets go!",
    })
  }

  return (
    <div> 
      {admins?.includes(session?.user.id!) ?
      <div className='flex justify-center md:justify-end px-5 py-8'>
        <Button className="p-5" onClick={() => callNextDepth()}>Go to next phase</Button>
      </div>
      : null
    }
    
    <div className="flex flex-row pt-4 space-x-6">
      {/* Round 10 */}
      <KoRoundColumn
        koRoundGrouped={round10Grouped}
        admins={admins}
        session={session}
        roundName={`Round of ${String(koPhaseblockData.blocks.filter((block) => block.depth == 10).length)}`}
      />

      {/* Round 9 */}
      <KoRoundColumn
        koRoundGrouped={round9Grouped}
        admins={admins}
        session={session}
        roundName={`Round of ${String(koPhaseblockData.blocks.filter((block) => block.depth == 9).length)}`}
      />

      {/* Round 8 */}
      <KoRoundColumn
        koRoundGrouped={round8Grouped}
        admins={admins}
        session={session}
        roundName={`Round of ${String(koPhaseblockData.blocks.filter((block) => block.depth == 8).length)}`}
      />

      {/* Round 7 */}
      <KoRoundColumn
        koRoundGrouped={round7Grouped}
        admins={admins}
        session={session}
        roundName={`Round of ${String(koPhaseblockData.blocks.filter((block) => block.depth == 7).length)}`}
      />

      {/* Round 6 */}
      <KoRoundColumn
        koRoundGrouped={round6Grouped}
        admins={admins}
        session={session}
        roundName={`Round of ${String(koPhaseblockData.blocks.filter((block) => block.depth == 6).length)}`}
      />

      {/* Round 5 */}
      <KoRoundColumn
        koRoundGrouped={round5Grouped}
        admins={admins}
        session={session}
        roundName={`Round of ${String(koPhaseblockData.blocks.filter((block) => block.depth == 5).length)}`}
      />

      {/* Round 4 */}
      <KoRoundColumn
        koRoundGrouped={round4Grouped}
        admins={admins}
        session={session}
        roundName={`Round of ${String(koPhaseblockData.blocks.filter((block) => block.depth == 4).length)}`}
      />

      {/* Quarterfinal */}
      <KoRoundColumn
        koRoundGrouped={quarterfinalGrouped}
        admins={admins}
        session={session}
        roundName={'Quarterfinal'}
      />

      {/* Semifinal */}
      <KoRoundColumn
        koRoundGrouped={semifinalGrouped}
        admins={admins}
        session={session}
        roundName={'Semifinal'}
      />

      {/* Final */}
      <KoRoundColumn
        koRoundGrouped={finalGrouped}
        admins={admins}
        session={session}
        roundName={'Final'}
      />

      {/* Winner */}
      <div className="flex flex-col w-full">

      <div className="flex justify-center mt-2 mb-4">
            <p className="text-2xl text-primary align-top">Winner&nbsp;</p>

            <svg className="flex justify-center mt-2 mb-4" fill="none" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512" xmlSpace="preserve">
            <g>
              <g>
                <g>
                  <path d="M368.757,255.406c30.472-5.416,58.07-19.807,80.124-41.852c28.54-28.54,44.259-66.191,44.259-106.495
				c0-30.311-24.743-54.708-55.157-54.708h-58.453c0-1.047,0-1.877,0-2.526V9.566c0-5.783-5.202-9.566-10.983-9.566H143.435
				c-5.782,0-9.957,3.783-9.957,9.566v41.881c0,0.129-0.498-0.142-0.494,0.905H73.992c-30.401,0-55.133,24.388-55.133,54.698
				c0,40.226,15.726,77.966,44.283,106.524c21.807,21.795,50.146,36.46,80.351,41.837c9.052,20.653,23.513,38.302,42.126,51.346
				c10.426,7.306,22.196,12.842,33.714,16.576v63.023h-4.865c-23.292,0-42.252,18.426-42.252,41.718v10.12
				c-23.035,0.195-41.881,19.061-41.881,42.232v20.581c0,5.783,4.698,10.994,10.481,10.994h230.348
				c5.782,0,10.46-5.211,10.46-10.994v-20.581c0-23.171-18.847-42.037-41.881-42.232v-10.12c0-23.292-18.939-41.718-42.231-41.718
				h-4.885v-62.974C326.131,313.015,353.777,288.661,368.757,255.406z M379.53,115.174h50.54
				c-2.835,30.364-22.27,58.376-50.54,71.562V115.174z M379.163,209.424c42.885-15.496,72.201-56.357,72.201-102.349
				c0-7.217-6.003-12.843-13.381-12.843h-58.453v-20.94h58.452c18.869,0,34.218,15.004,34.218,33.767
				c0,34.71-13.54,67.234-38.123,91.817c-16.244,16.235-35.974,27.586-57.758,33.471
				C377.992,224.817,378.942,217.135,379.163,209.424z M77.948,198.653c-24.6-24.601-38.149-56.961-38.149-91.594
				c0-18.763,15.339-33.767,34.193-33.767h59.485v20.941H74.002c-7.337,0-13.083,5.487-13.083,12.826
				c0,24.3,7.814,47.135,22.597,66.286c12.701,16.453,30.134,29.018,49.689,36.066c0.005,0.192,0.216,12.659,2.723,22.863
				C114.169,226.347,94.005,214.702,77.948,198.653z M133.477,115.174v71.538c-28.27-13.141-48.422-41.174-51.263-71.538H133.477z
				 M154.417,20.941h204.172v20.941H154.417V20.941z M339.394,459.648c11.745,0,21.289,9.032,21.289,20.777v10.634H151.276v-10.634
				c0-11.746,9.566-20.777,21.311-20.777H339.394z M297.512,407.297c11.745,0,21.289,9.032,21.289,20.777v10.634H193.158v-10.634
				c0-11.746,9.566-20.777,21.311-20.777H297.512z M240.274,386.356V327.89c5.235,0.668,10.487,1.025,15.813,1.025
				c5.27,0,10.362-0.352,15.598-1.002v58.442H240.274z M256.176,307.975c-41.994,0-80.371-26.35-95.378-65.57
				c-0.076-0.199,0-0.396-0.088-0.589c-2.621-6.945-6.294-24.425-6.294-35.927V62.822h204.172v143.067
				c0,11.082-2.356,23.029-6.875,36.515C335.825,282.247,298.313,307.975,256.176,307.975z" fill="currentColor" />
                  <path d="M311.134,159.456c-2.296-1.922-5.155-4.316-5.977-5.737c-0.926-1.6-1.594-5.264-2.183-8.498
				c-1.453-7.97-3.26-17.889-12.219-23.071c-8.745-5.06-18.103-1.763-25.624,0.888c-3.215,1.134-6.861,2.419-8.946,2.419
				s-5.73-1.285-8.946-2.419c-7.517-2.649-16.875-5.95-25.623-0.888c-8.961,5.184-10.768,15.102-12.22,23.074
				c-0.589,3.233-1.258,6.897-2.182,8.496c-0.823,1.422-3.681,3.815-5.978,5.738c-5.974,5.003-14.157,11.853-14.157,22.539
				s8.182,17.538,14.157,22.539c2.296,1.923,5.155,4.317,5.977,5.737c0.926,1.6,1.594,5.264,2.183,8.498
				c1.453,7.97,3.26,17.889,12.22,23.072c8.744,5.059,18.103,1.762,25.623-0.889c3.215-1.134,6.861-2.419,8.946-2.419
				s5.73,1.285,8.946,2.418c4.656,1.641,10.016,3.531,15.5,3.531c3.373,0,6.792-0.715,10.123-2.642
				c8.961-5.184,10.768-15.102,12.221-23.073c0.589-3.233,1.256-6.898,2.181-8.497c0.823-1.422,3.681-3.814,5.978-5.737
				c5.974-5.003,14.157-11.854,14.157-22.54S317.11,164.459,311.134,159.456z M297.689,188.48
				c-3.926,3.288-7.987,6.686-10.66,11.306c-2.747,4.75-3.762,10.318-4.657,15.229c-0.481,2.64-1.255,6.893-2.134,8.521
				c-1.816-0.101-5.718-1.475-8.146-2.332c-4.8-1.692-10.239-3.609-15.907-3.609s-11.107,1.917-15.907,3.609
				c-2.428,0.855-6.329,2.23-8.146,2.332c-0.878-1.629-1.653-5.881-2.134-8.521c-0.895-4.912-1.91-10.479-4.658-15.229
				c-2.672-4.618-6.732-8.018-10.659-11.306c-2.226-1.864-5.882-4.926-6.603-6.484c0.72-1.558,4.377-4.621,6.603-6.484
				c3.926-3.288,7.987-6.686,10.66-11.306c2.747-4.75,3.762-10.318,4.657-15.228c0.481-2.64,1.255-6.893,2.134-8.521
				c1.816,0.101,5.718,1.476,8.146,2.332c4.8,1.692,10.24,3.609,15.907,3.609s11.107-1.917,15.907-3.609
				c2.428-0.855,6.329-2.231,8.146-2.332c0.877,1.629,1.653,5.881,2.134,8.521c0.895,4.912,1.91,10.479,4.658,15.229
				c2.672,4.618,6.732,8.018,10.659,11.305c2.226,1.864,5.882,4.926,6.603,6.484C303.572,183.554,299.915,186.616,297.689,188.48z"
                  />
                </g>
              </g>
            </g>
          </svg>
          </div>
        <div className="flex flex-col justify-center align-center h-full w-full content-center">

          {Object.entries(winnerGrouped ?? {}).map(([groupId, blocks]: [string, BlockResource[]]) => (
            <div key={groupId} className="flex flex-col justify-center align-center space-y-1">
              {blocks.map((block: BlockResource) => (
                <div key={block.id} className='w-full'>
                  {block.blockResult == "w" ?
                    <div className="flex flex-row w-full bg-winner text-center align-center justify-center py-2 px-4 rounded-md hover:opacity-75 hover:cursor-pointer">
                      <p className="text-white">{block.name ? block.name : "To be decided"}</p>
                    </div>
                    : block.blockResult == "nd" ?
                      <>
                        {block.name ?
                          <div className="flex flex-row w-full bg-gold text-center align-center justify-center py-2 px-4 rounded-md hover:opacity-75 hover:cursor-pointer">
                            <p className="text-black">{block.name}</p>
                          </div>
                          :
                          <div className="flex flex-row w-full bg-secondary text-center align-center justify-center py-2 px-4 rounded-md hover:opacity-75 hover:cursor-pointer">
                            <p className="">{"To be decided"}</p>
                          </div>}
                      </>
                      : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
