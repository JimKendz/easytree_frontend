"use client"
import { TournamentsResource } from "@/app/Resources";
import { getMyTournamentsAdmin } from "@/app/api/tournament/route";
import { useEffect, useState } from "react";
import { MyDataTable } from "./my-data-table";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { columns } from "../tournamentOverview/columns";

function MyAdminClientTable({ token }: { token: string| undefined }) {
    const [myAdminTournaments, setMyTournamentsAdmin] = useState<TournamentsResource | null>(null);
    async function load() {
        const t = await getMyTournamentsAdmin();
        setMyTournamentsAdmin(t);
    }
  useEffect(() => { load(); }, []);
  return (
    <>
    {token ?
    <div className="container flex-col space-y-6">
          {myAdminTournaments ?
        <MyDataTable columns={columns} data={myAdminTournaments.tournaments}/>
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

export default MyAdminClientTable