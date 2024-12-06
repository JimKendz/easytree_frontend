"use client"
import { TournamentsResource } from "@/app/Resources";
import { getTournaments } from "@/app/api/tournament/route";
import { columns } from "@/components/tournamentOverview/columns"
import { DataTable } from "@/components/tournamentOverview/data-table"
import { useEffect, useState } from "react";

//this component is used to pass down the token to the data table 
//at the moment the token is being passed down, but is not used in the individual columns

function ClientTable({ token }: { token: string| undefined })  {

  const [tournaments, setTournaments] = useState<TournamentsResource | null>(null);
  async function load() {
      const t = await getTournaments();
      setTournaments(t);
  }
  useEffect(() => { load(); }, []);
  return (
    <>
    <div className="container flex-col space-y-6">
          {tournaments ?
        <DataTable columns={columns} data={tournaments.tournaments}/>
        : <p>Loading...</p>}
    </div>
    </>
  )
}

export default ClientTable