"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Link, MoreHorizontal } from "lucide-react"
import { Button, buttonVariants } from "../ui/button"
import {
  LockClosedIcon,
  LockOpen1Icon
} from "@radix-ui/react-icons"
import { states } from "@/app/data/data"
import React from "react";
import { useSession } from "next-auth/react";
import { TOURNAMENTSTATE, TournamentResource } from "@/app/Resources"
import { joinTournament } from "@/app/api/tournament/route"
import { useRouter } from "next/navigation"


export const myColumns: ColumnDef<TournamentResource>[] = [
  {
    accessorKey: "public",
    header: () => <div className="text-left"></div>,
    cell: ({ row }) => {
      const isPublic = row.getValue("public")
      return isPublic ? (
        <LockOpen1Icon></LockOpen1Icon>
      ) : (
        <LockClosedIcon></LockClosedIcon>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const id = row.original.id
      //const router = useRouter()
      return (
          row.getValue("name")
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags : Array<String> = row.getValue("tags")
      const tagsString = tags.join(", ")   
      return  (
        <div className="font-medium">{tagsString}</div>
      )
    },
  },
  {
    accessorKey: "tournamentState",
    header: "State",
    cell: ({ row }) => {
      const state = states.find(
        (state) => state.value === row.getValue("tournamentState")
      )
      if (!state) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {state.icon && (
            <state.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{state.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "size",
    header: () => <div className="text-right">Size</div>,
    cell: ({ row }) => {
      const size = row.original.totalParticipants
      const participants = row.original?.participants;
      return participants ? (
        <div className="text-right font-medium">{participants.length}/{size}</div>
      ) : (
        <div className="text-right font-medium">0/{size}</div>
      )
    },
    enableHiding: false,
  },
]
