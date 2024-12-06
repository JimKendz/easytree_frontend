import {
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
  } from "@radix-ui/react-icons"
import { TOURNAMENTSTATE } from "../Resources"

//data for Tournamentstate in columns Component

export const states = [
    {
      value: TOURNAMENTSTATE.signUpPhase,
      label: "Signup",
      icon: CircleIcon,
    },
    {
      value: TOURNAMENTSTATE.drawPhase,
      label: "Draw",
      icon:  QuestionMarkCircledIcon,
    },
    {
      value: TOURNAMENTSTATE.onGoing,
      label: "Ongoing",
      icon: StopwatchIcon,
    },
    {
      value:TOURNAMENTSTATE.completed,
      label: "Completed",
      icon: CheckCircledIcon,
    },
    {
      value: TOURNAMENTSTATE.discarded,
      label: "Discarded",
      icon: CrossCircledIcon,
    },
  ]