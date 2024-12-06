import { useSession } from 'next-auth/react';

export function BlockUnit(blockData: any) {
    const { data: session, status } = useSession()
  
    return (
      <>
        {blockData.blockData.name == session?.user.name ?
          <>
            {blockData.blockData.blockResult == "w" ?
              <div className="flex flex-row w-full bg-winner text-center align-center justify-between py-2 px-3 rounded-md border-2 border-yellow-500 hover:opacity-75 hover:cursor-pointer">
                <p className="text-white">{blockData.blockData.name ? blockData.blockData.name : "To be decided"}</p>
                <p className="text-white ml-[min(12px)]">{blockData.blockData.score}</p>
              </div>
              : blockData.blockData.blockResult == "l" ?
                <div className="flex flex-row w-full bg-loser text-center align-center justify-between py-2 px-3 rounded-md border-2 border-yellow-500 hover:opacity-75 hover:cursor-pointer">
                  <p className="text-white">{blockData.blockData.name ? blockData.blockData.name : "To be decided"}</p>
                  <p className="text-white ml-[min(12px)]">{blockData.blockData.score}</p>
                </div>
                : blockData.blockData.blockResult == "nd" ?
                  <div className="flex flex-row w-full bg-secondary text-center align-center justify-between py-2 px-3 rounded-md border-2 border-yellow-500 hover:opacity-75 hover:cursor-pointer">
                    <p className="">{blockData.blockData.name ? blockData.blockData.name : "To be decided"}</p>
                    <p className="ml-[min(12px)]">{blockData.blockData.score}</p>
                  </div>
                  : null}
          </>
          : !session ?
          <>
            {blockData.blockData.blockResult == "w" ?
              <div className="flex flex-row w-full bg-winner text-center align-center justify-between py-2 px-4 rounded-md hover:opacity-75 hover:cursor-pointer">
                <p className="text-white">{blockData.blockData.name ? blockData.blockData.name : "To be decided"}</p>
                <p className="text-white ml-[min(12px)]">{blockData.blockData.score}</p>
              </div>
              : blockData.blockData.blockResult == "l" ?
                <div className="flex flex-row w-full bg-loser text-center align-center justify-between py-2 px-4 rounded-md hover:opacity-75 hover:cursor-pointer">
                  <p className="text-white">{blockData.blockData.name ? blockData.blockData.name : "To be decided"}</p>
                  <p className="text-white ml-[min(12px)]">{blockData.blockData.score}</p>
                </div>
                : blockData.blockData.blockResult == "nd" ?
                  <div className="flex flex-row w-full bg-secondary text-center align-center justify-between py-2 px-4 rounded-md hover:opacity-75 hover:cursor-pointer">
                    <p className="">{blockData.blockData.name ? blockData.blockData.name : "To be decided"}</p>
                    <p className="ml-[min(12px)]">{blockData.blockData.score}</p>
                  </div>
                  : null}
          </>
          :
          <>
            {blockData.blockData.blockResult == "w" ?
              <div className="flex flex-row w-full bg-winner text-center align-center justify-between py-2 px-4 rounded-md hover:opacity-75 hover:cursor-pointer">
                <p className="text-white">{blockData.blockData.name ? blockData.blockData.name : "To be decided"}</p>
                <p className="text-white ml-[min(12px)]">{blockData.blockData.score}</p>
              </div>
              : blockData.blockData.blockResult == "l" ?
                <div className="flex flex-row w-full bg-loser text-center align-center justify-between py-2 px-4 rounded-md hover:opacity-75 hover:cursor-pointer">
                  <p className="text-white">{blockData.blockData.name ? blockData.blockData.name : "To be decided"}</p>
                  <p className="text-white ml-[min(12px)]">{blockData.blockData.score}</p>
                </div>
                : blockData.blockData.blockResult == "nd" ?
                  <div className="flex flex-row w-full bg-secondary text-center align-center justify-between py-2 px-4 rounded-md hover:opacity-75 hover:cursor-pointer">
                    <p className="">{blockData.blockData.name ? blockData.blockData.name : "To be decided"}</p>
                    <p className="ml-[min(12px)]">{blockData.blockData.score}</p>
                  </div>
                  : null}
          </>
        }
      </>
    );
  }