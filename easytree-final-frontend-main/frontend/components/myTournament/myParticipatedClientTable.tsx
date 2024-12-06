"use client"
import { TournamentsResource } from "@/app/Resources";
import { getMyTournamentsAdmin, getMyTournamentsParticipant } from "@/app/api/tournament/route";
import { useEffect, useState } from "react";
import { myColumns } from "./columns";
import { MyDataTable } from "./my-data-table";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

function MyParticipatedClientTable({ token }: { token: string| undefined }) {
    const [myParticipatedTournaments, setMyTournamentsParticipant] = useState<TournamentsResource | null>(null);
    async function load() {
        const p = await getMyTournamentsParticipant();
        setMyTournamentsParticipant(p);
    }
  useEffect(() => { load(); }, []);
  return (
    <>
    {token ?
    <div className="container flex-col space-y-6">
          {myParticipatedTournaments ?
        <MyDataTable columns={myColumns} data={myParticipatedTournaments.tournaments}/>
        : <p>Loading...</p>}

    </div> : 
    <div className='flex-col gap-6 py-6 items-center justify-center'>
    <div className='flex py-6 items-center justify-center'>You need to log in to access your tournaments.</div>
  </div>  }
    </>
  )
}

export default MyParticipatedClientTable