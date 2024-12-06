"use server"

import { TournamentsResource, TournamentResource, KOPhaseResource, BlockResource, CompleteTournamentResource } from "@/app/Resources";
import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { revalidateTag } from "next/cache";

const HOST = process.env.API_SERVER_URL;

export async function createTournament(name: string, description: string, visability: boolean, startDate : Date, tags: string[], totalParticipants: number, participantsPerMatch: number, tournamentSystem : number) : Promise<TournamentResource|null>{
  const session = await getServerSession(authOptions)
  let systemArray: string[]

  try {
    //const body = await request.json();
    //const systemArray = [body.tournamentSystem]
    const res = await fetch(`${HOST}/api/tournament`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        description: description,
        public: visability,
        startDate: startDate,
        tags: tags,
        admins: [],
        tournamentSystem: [tournamentSystem],
        totalParticipants: totalParticipants,
        participantsPerMatch: participantsPerMatch
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user.access_token}`,
        Cookie: `${session?.user.access_token}`,
      }
    })
    return res.json()
  } catch (error: any) {
  }
  return null;
}


export async function getTournaments(): Promise<TournamentsResource | null> {
  try {
    const url = `${HOST}/api/tournaments`;
    const res = await fetch(url, { next: { revalidate: 30, tags: ['getTournaments'] }, });
    const data = await res.json();
    return data;
  } catch (err) {
  }
  return null;
}

export async function getMyTournamentsAdmin(): Promise<TournamentsResource | null> {
  const session = await getServerSession(authOptions)
  try {
    const url = `${HOST}/api/tournaments/myTournamentsAdmin`;
    const res = await fetch(url,{
      method: 'GET',
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user.access_token}`,
        Cookie: `${session?.user.access_token}`,
      }
    });
    const data = await res.json();
    return data;
  } catch (err) {
  }
  return null;
}

export async function getMyTournamentsParticipant(): Promise<TournamentsResource | null> {
  const session = await getServerSession(authOptions)
  try {
    const url = `${HOST}/api/tournaments/myTournamentsParticipant`;
    const res = await fetch(url,{
      method: 'GET',
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user.access_token}`,
        Cookie: `${session?.user.access_token}`,
      }
    });
    const data = await res.json()
    return data;
  } catch (err) {
  }
  return null;
}

export async function joinTournament(tournamentId: string) {
  const session = await getServerSession(authOptions)
  try {
    const res = await fetch(`${HOST}/api/tournament/${tournamentId}`, {
      method: 'PUT',
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user.access_token}`,
        Cookie: `${session?.user.access_token}`,
      }
    }).then( () =>   {
      revalidateTag('getTournamentData')
      revalidateTag('getTournaments')
      revalidateTag('getCompleteTournamentData')
    } )
  } catch (error: any) {
  }
}

export async function getTournamentData( id : string ): Promise<TournamentResource | null> {
  try {
    const url = `${HOST}/api/tournament/${id}`;
    const res = await fetch(url, { next: { revalidate: 30, tags: ['getTournamentData'] }, });
    const data = await res.json();
    return data;
  } catch (err) {
  }
  return null;
}

export async function getKoPhaseData( id : string ): Promise<KOPhaseResource | null> {
  try {
    const url = `${HOST}/api/kophase/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
  }
  return null;
}

export async function getBlockData( id : String ): Promise<BlockResource | null> {
  try {
    const url = `${HOST}/api/block/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
  }
  return null;
}

export async function getCompleteTournamentData( id : string ): Promise<CompleteTournamentResource | null> {
  try {
    const url = `${HOST}/api/tournament/complete/${id}`;
    const res = await fetch(url, { next: { revalidate: 30, tags: ['getCompleteTournamentData'] } });
    const data = await res.json();
    return data;
  } catch (err) {
  }
  return null;
}

export async function addScore( id : string, score: number ): Promise<any | null> {
  try {
    const url = `${HOST}/api/block/${id}`;
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        score: score
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json();
    return data;
  } catch (err) {
  }
  return null;
}

export async function nextDepth( id : String ): Promise<any | null> {
  try {
    const url = `${HOST}/api/kophase/${id}/nextDepth`;
    const res = await fetch(url, {
      cache: "no-store",
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      }
    }).then( (res) =>   {
      revalidateTag('getCompleteTournamentData')
      return res;
    } );
    const data = await res.json();
    return data;
  } catch (err) {
  }
  return null;
}

export async function addUsersToKoPhase( id : String, participants: any ): Promise<any | null> {
  try {
    const url = `${HOST}/api/kophase/${id}/addUsers`;
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        participants: participants,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json();
    return data;
  } catch (err) {
  }
  return null;
}

export async function deleteTournament( id: {tournamentID : String} ): Promise<any | null> {
  const session = await getServerSession(authOptions)
  try {
    const url = `${HOST}/api/tournament/${id.tournamentID}`;
    const res = await fetch(url, {
      cache: "no-store",
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await res.json();
    return data;
  } catch (err) {
  }
  return null;
}