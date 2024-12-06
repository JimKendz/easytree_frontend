import NextAuth from "next-auth";

export type UsersResource = {
    users: UserResource[]
}

export type UserResource = {
    id?: string
    name: string
    email: string
    admin: boolean
    password?: string
}

export type ResultResource = {
    participant: string,
    score: number
}

export type LoginResource = {
    /** The JWT */
    "access_token": string,
    /** Constant value */
    "token_type": "Bearer"
}

export type BlockResource = {
    id?: string
    next?: string
    depth?: number
    participant?: string
    name?: string
    score?: number
    blockState?: BLOCKSTATE
    blockResult?: BLOCKRESULT
}

export enum BLOCKRESULT {
    winner = "w",
    loser = "l",
    notDecided = "nd"
}

export type BlocksResource = {
    blocks: BlockResource[]
}

export type KOPhaseResource = {
    id?: String
    totalParticipants: number
    blocks: String[];
}

export type TournamentsResource = {
    tournaments: TournamentResource[]
}
export type TournamentResource = {
    id?: string,
    name: string;
    description: string;
    public?: boolean;
    tags: string[];
    admins: String[]
    participants?: String[];
    tournamentSystem: String[];
    totalParticipants: number;
    participantsPerMatch?: number;
    tournamentState: TOURNAMENTSTATE;
    startDate?: Date;
}

export enum BLOCKSTATE{
    scheduled = "scheduled",
    onGoing = "onGoing",
    completed = "completed"
}

export enum TOURNAMENTSTATE{
    signUpPhase ="signUpPhase",
    drawPhase = "drawPhase",
    onGoing = "onGoing",
    completed = "completed",
    discarded = "discarded"
}

export type CompleteTournamentResource = {
    tournament: TournamentResource,
    participants: UsersResource,
    kophase: KOPhaseResource,
    blocks: BlocksResource
}

declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        name: string;
        //role: string;
        access_token: string;
      };
    }
  }