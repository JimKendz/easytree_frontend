import { authOptions } from "@/auth"
import MyAdminClientTable from "@/components/myTournament/myAdminClientTable"
import MyParticipatedClientTable from "@/components/myTournament/myParticipatedClientTable"

import { getServerSession } from "next-auth"

async function MyTournamentOverviewpage() {
const session = await getServerSession(authOptions)
  return (
    <div className="container flex-col space-y-6 mt-5">

        <h1 className="text-4xl text-center">My hosted Tournaments</h1>
        <MyAdminClientTable token={session?.user.access_token}></MyAdminClientTable>

        <h1 className="text-4xl text-center">My participated Tournaments</h1>
        <MyParticipatedClientTable token={session?.user.access_token}></MyParticipatedClientTable>
    </div>
  )
}

export default MyTournamentOverviewpage