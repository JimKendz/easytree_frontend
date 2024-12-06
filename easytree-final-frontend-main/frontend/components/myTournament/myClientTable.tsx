"use client"
import { TournamentsResource } from "@/app/Resources";
import { getTournaments } from "@/app/api/tournament/route";
import { useEffect, useState } from "react";
import { myColumns } from "./columns";
import { MyDataTable } from "./my-data-table";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

function MyClientTable({ token }: { token: string| undefined }) {
    const [myTournaments, setMyTournaments] = useState<TournamentsResource | null>(null);
    async function load() {
        const t = await getTournaments();
        setMyTournaments(t);
    }
  useEffect(() => { load(); }, []);
  return (
    <>
    {token ?
    <div className="container flex-col space-y-6">
          {myTournaments ?
        <MyDataTable columns={myColumns} data={myTournaments.tournaments}/>
        : <p>Loading...</p>}

    </div> : 
    <div className='flex-col gap-6 py-6 items-center justify-center'>
    <div className='flex py-6 items-center justify-center'>You need to log in to access your tournaments.</div>
        <div className='flex gap-6 py-6 items-center justify-center'>
            <Link href="/auth?mode=register" className={buttonVariants({ variant: "secondary" })}>Register</Link>
            <Link href="/auth?mode=login" className={buttonVariants({ variant: "default" })}>Login</Link>
        </div>
  </div>  }
    </>
  )
}

export default MyClientTable