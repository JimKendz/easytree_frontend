
import { columns } from "@/components/tournamentOverview/columns"
import { DataTable } from "@/components/tournamentOverview/data-table"
import { useEffect, useState } from "react";
import { TournamentsResource } from "../Resources";
import { getTournaments } from "../api/tournament/route";
import ClientTable from "@/components/tournamentOverview/clientTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

async function TournamentOverviewpage() {
  const session = await getServerSession(authOptions)
  return (
    <>
    <div className="container flex-col space-y-6">
        <h1 className="text-4xl text-center">Tournaments</h1>  
        <ClientTable token={session?.user.access_token}></ClientTable>

    </div>
    </>
  )
}

export default TournamentOverviewpage