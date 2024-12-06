"use client"

import { TOURNAMENTSTATE, TournamentResource} from "@/app/Resources";
import { useSession } from "next-auth/react";
import { toast } from "../ui/use-toast";
import { joinTournament } from "@/app/api/tournament/route";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface JoinButtonProps {
    tournament: TournamentResource;
  }

function JoinButton({tournament} : JoinButtonProps) {
    const totalSize = tournament.totalParticipants
    const participants = tournament.participants
    const participantsSize = participants ? participants.length
      : 0;
    const state = tournament.tournamentState
    const publicTournament = tournament.public
    const tournamentName = tournament.name
    const tournamentId = tournament.id
    const { data: session } = useSession();
    const userId = session?.user.id!
    const router = useRouter()

    return (
         state ===
      TOURNAMENTSTATE.signUpPhase &&
      publicTournament &&
      session &&
      totalSize !== participantsSize &&
      !participants?.includes(userId) ? (
      <Button
        onClick={(e) => {
          e.preventDefault
          joinTournament(tournamentId!).then(() => {
            router.push(`/tournamentDashboard/${tournamentId}`)
            toast({
              title: `Welcome to ${tournamentName}`,
              description: "Thanks for joining! Best of luck and enjoy.",
            })
          })
        }}
      >
        Join
      </Button>
    ) : null
    )
}

export default JoinButton