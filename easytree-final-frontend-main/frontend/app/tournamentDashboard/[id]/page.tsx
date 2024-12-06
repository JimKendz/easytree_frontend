import { Metadata } from "next"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PersonIcon } from "@radix-ui/react-icons"
import { CalendarDate } from "@/components/dashboard/calendar-date"
import { TopParticipants } from "@/components/dashboard/top-participants"
import { KoBracket } from "@/components/dashboard/ko-bracket"
import { getCompleteTournamentData, nextDepth } from "@/app/api/tournament/route"
import { BlockResource, BlocksResource, CompleteTournamentResource, UserResource } from "@/app/Resources"
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import JoinButton from "@/components/dashboard/joinButton";
import Link from "next/link";
import { DeleteButton } from "@/components/dashboard/delete-button";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';


export const metadata: Metadata = {
  title: "Dashboard",
  description: "See whats going on in this Tournament",
}

export default async function DashboardPage({ params, searchParams }: { params: { id: string }, searchParams: { mode: string | undefined } }) {
  const mode = searchParams
  const session = await getServerSession(authOptions)
  const completeTournamentData : CompleteTournamentResource | null = await getCompleteTournamentData(params.id)
  const koPhaseblockData: BlocksResource = {
    blocks: (await Promise.all((completeTournamentData?.blocks.blocks ?? []).filter((block) => block !== null) as BlockResource[],))
  };
  const tournamentID : string | undefined = completeTournamentData?.tournament.id
  const koPhaseID : String | undefined = completeTournamentData?.tournament.tournamentSystem[0]

  return (
    <>
      <div className="flex flex-col" suppressHydrationWarning={true}>
        <div className="flex-1 space-y-4 p-12 pt-6">
          <div className="flex flex-col items-center justify-between space-y-2 sm:flex-row">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex flex-row p-4 items-center space-x-2">
              {completeTournamentData ?
              <JoinButton tournament={completeTournamentData.tournament}></JoinButton> : null
              }
              {completeTournamentData?.tournament.startDate ? 
                <CalendarDate tournamentDate={new Date(completeTournamentData?.tournament.startDate)} />
              : null}
              { /*{completeTournamentData?.tournament.admins?.includes(session?.user.id!) ?
                <div className='flex flex-col space-y-10'>
                  <DeleteButton tournamentID={tournamentID!} />
                </div>
                : null
              }
              
              <Dialog>
                  <DialogTrigger className={buttonVariants({ variant: "default" })}>
                    Rulebook
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                      <DialogTitle>Rulebook</DialogTitle>
                      <DialogDescription>
                        Here you can see the rulebook of the tournament, but it is not implemented yet.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
              </Dialog> */}
            </div>
          </div>
          <Tabs defaultValue={mode.mode == "knockoutStage" ? mode.mode : "overview"} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="knockoutStage">
                Knockout Stage
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Dialog>
                <div className="grid gap-4 md:grid-cols-5">
                  <Card className="md:col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Tournament information
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-5xl font-bold">{completeTournamentData?.tournament.name}</div>
                      <p className="pt-4 text-l text-muted-foreground">
                        {completeTournamentData?.tournament.description}
                      </p>
                    </CardContent>
                  </Card>
                  <div className="md:col-span-2 h-full w-full">
                      <DialogTrigger className="h-full w-full">
                        <Card className="h-full hover:cursor-pointer hover:bg-secondary w-full">
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                              Participants
                            </CardTitle>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="h-4 w-4 text-muted-foreground"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                          </CardHeader>
                          <CardContent className="flex flex-col ">
                            <div className="text-start text-2xl font-bold">{completeTournamentData?.tournament.participants?.length}/{completeTournamentData?.tournament.totalParticipants} Teams</div>
                            <p className="text-start text-s text-muted-foreground mt-4">
                              Click to see who is competing in this tournament.
                            </p>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[400px]">
                        <DialogHeader>
                          <DialogTitle>Participants</DialogTitle>
                          <DialogDescription>
                            Here you can see, who is going to battle it out in this tournament.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col justify-center align-center space-y-4">
                          {completeTournamentData?.participants.users.map((user: UserResource) => (
                            <div key={user.id} className="flex">
                              <PersonIcon className="mr-2 h-4 w-4" />
                              
                              <Label className="self-center">
                                {user.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                  </div>
                </div>
              
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-7 w-full">
                <Card className="w-full col-span-4 lg:col-span-3">
                  <CardHeader>
                    <CardTitle>
                      {completeTournamentData?.tournament.tournamentState == "signUpPhase" ? 
                    <div>
                      <p className="text-2xl font-bold">Sign up Phase</p>
                    </div>
                    : completeTournamentData?.tournament.tournamentState == "drawPhase" ? 
                    <div>
                      <p className="text-2xl font-bold">Draw phase</p>
                    </div>
                    : completeTournamentData?.tournament.tournamentState == "onGoing" ? 
                    <div>
                      <p className="text-2xl font-bold">Knockout Stage</p>
                    </div>
                    : completeTournamentData?.tournament.tournamentState == "completed" ? 
                    <div>
                      <p className="text-2xl font-bold">Completed</p>
                    </div>
                    : null}
                    </CardTitle>
                    <CardDescription>
                      {completeTournamentData?.tournament.tournamentState == "signUpPhase" ? 
                      <div>
                        <p className="text-s text-muted-foreground">
                          The matchups will be drawn when the tournament is full. Stay tuned!
                        </p>
                      </div>
                      : completeTournamentData?.tournament.tournamentState == "drawPhase" ? 
                      <div>
                        <p className="text-s text-muted-foreground">
                          The draw is done. Look at the Knockout Stage to find out who plays who!
                        </p>
                      </div>
                      : completeTournamentData?.tournament.tournamentState == "onGoing" ? 
                      <div>
                        <p className="text-s text-muted-foreground">
                          The participants battle it out right now.
                        </p>
                      </div>
                      : completeTournamentData?.tournament.tournamentState == "completed" ? 
                      <div>
                        <p className="text-s text-muted-foreground">
                          The tournament is completed, but you can still look at the results.
                        </p>
                      </div>
                      : null}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="container">
                      <div className="flex flex-col md:grid grid-cols-12 text-gray-50">
                        <div className="flex md:contents">
                          
                          <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                            <div className="h-full w-6 flex items-center justify-center">
                              <div className="h-full w-1 bg-blue pointer-events-none"></div>
                            </div>
                              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue shadow text-center">
                                <i className="fas fa-check-circle text-white"></i>
                              </div>
                          </div>
                          {completeTournamentData?.tournament.tournamentState == "signUpPhase"  ?
                            <div className="bg-blue col-start-4 col-end-12 px-4 py-2 rounded-xl my-3 mr-auto shadow-md w-full hover:cursor-pointer hover:bg-bluehover">
                              <DialogTrigger className="h-full w-full">
                                <h3 className="text-justify font-semibold text-lg mb-1">Signup Phase</h3>
                                <p className="leading-tight text-justify w-full">
                                  Click to see the participants
                                </p>
                              </DialogTrigger>
                            </div>
                          : 
                            <div className="bg-blueSecondary col-start-4 col-end-12 px-4 py-2 rounded-xl my-3 mr-auto shadow-md w-full">
                              <h3 className="font-semibold text-lg mb-1">Signup Phase</h3>
                            </div>
                          }
                        </div>

                        {completeTournamentData?.tournament.tournamentState == "drawPhase"  ?
                          <div className="flex md:contents">
                            <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                              <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-blue pointer-events-none"></div>
                              </div>
                              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue shadow text-center">
                                <i className="fas fa-check-circle text-white"></i>
                              </div>
                            </div>
                          
                            <div className="bg-blue col-start-4 col-end-12 px-4 py-2 rounded-xl my-3 mr-auto shadow-md w-full">
                              <h3 className="font-semibold text-lg mb-1">Draw Phase</h3>
                              <p className="leading-tight text-justify w-full">
                                Click on the Knockout Stage tab to see the bracket
                              </p>
                            </div>
                          </div>
                        : completeTournamentData?.tournament.tournamentState == "onGoing" || completeTournamentData?.tournament.tournamentState == "completed"  ?
                          <div className="flex md:contents">
                            <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                              <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-blue pointer-events-none"></div>
                              </div>
                              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue shadow text-center">
                                <i className="fas fa-check-circle text-white"></i>
                              </div>
                            </div>
                         
                            <div className="bg-blueSecondary col-start-4 col-end-12 px-4 py-2 rounded-xl my-3 mr-auto shadow-md w-full">
                              <h3 className="font-semibold text-lg mb-1">Draw Phase</h3>
                            </div>
                          </div>
                        : completeTournamentData?.tournament.tournamentState == "signUpPhase"  ?
                          <div className="flex md:contents">
                            <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                              <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-gray-300 pointer-events-none"></div>
                              </div>
                              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-300 shadow text-center">
                                <i className="fas fa-check-circle text-white"></i>
                              </div>
                            </div>
                         
                            <div className="bg-gray-300 col-start-4 col-end-12 px-4 py-2 rounded-xl my-3 mr-auto shadow-md w-full">
                              <h3 className="font-semibold text-lg mb-1 text-gray-600">Draw Phase</h3>
                            </div>
                          </div>
                        : null
                        }

                        {completeTournamentData?.tournament.tournamentState == "onGoing"  ?
                          <div className="flex md:contents">
                            <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                              <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-blue pointer-events-none"></div>
                              </div>
                              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue shadow text-center">
                                <i className="fas fa-check-circle text-white"></i>
                              </div>
                            </div>
                          
                            <div className="bg-blue col-start-4 col-end-12 px-4 py-2 rounded-xl my-3 mr-auto shadow-md w-full">
                                <h3 className="font-semibold text-lg mb-1">Knockout Stage</h3>
                                <p className="leading-tight text-justify w-full">
                                  Click on the Knockout Stage tab to see the bracket
                                </p>
                            </div>
                          </div>
                        : completeTournamentData?.tournament.tournamentState == "completed"  ?
                          <div className="flex md:contents">
                            <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                              <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-blue pointer-events-none"></div>
                              </div>
                              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue shadow text-center">
                                <i className="fas fa-check-circle text-white"></i>
                              </div>
                            </div>
                         
                            <div className="bg-blueSecondary col-start-4 col-end-12 px-4 py-2 rounded-xl my-3 mr-auto shadow-md w-full">
                              <h3 className="font-semibold text-lg mb-1">Knockout Stage</h3>
                            </div>
                          </div>
                        : completeTournamentData?.tournament.tournamentState == "drawPhase" || completeTournamentData?.tournament.tournamentState == "signUpPhase"  ?
                          <div className="flex md:contents">
                            <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                              <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-gray-300 pointer-events-none"></div>
                              </div>
                              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-300 shadow text-center">
                                <i className="fas fa-check-circle text-white"></i>
                              </div>
                            </div>
                         
                            <div className="bg-gray-300 col-start-4 col-end-12 px-4 py-2 rounded-xl my-3 mr-auto shadow-md w-full">
                              <h3 className="font-semibold text-lg mb-1 text-gray-600">Knockout Stage</h3>
                            </div>
                          </div>
                        : null
                        }

                        {completeTournamentData?.tournament.tournamentState == "completed"  ?
                          <div className="flex md:contents">
                            <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                              <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-blue pointer-events-none"></div>
                              </div>
                              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue shadow text-center">
                                <i className="fas fa-check-circle text-white"></i>
                              </div>
                            </div>
                          
                            <div className="bg-blue col-start-4 col-end-12 px-4 py-2 rounded-xl my-3 mr-auto shadow-md w-full">
                              <h3 className="font-semibold text-lg mb-1">Completed</h3>
                              <p className="leading-tight text-justify w-full">
                                Click on the Knockout Stage tab to see the completed bracket
                              </p>
                            </div>
                          </div>
                        : completeTournamentData?.tournament.tournamentState == "drawPhase" || completeTournamentData?.tournament.tournamentState == "signUpPhase" || completeTournamentData?.tournament.tournamentState == "onGoing"  ?
                          <div className="flex md:contents">
                            <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                              <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-gray-300 pointer-events-none"></div>
                              </div>
                              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-300 shadow text-center">
                                <i className="fas fa-check-circle text-white"></i>
                              </div>
                            </div>
                         
                            <div className="bg-gray-300 col-start-4 col-end-12 px-4 py-2 rounded-xl my-3 mr-auto shadow-md w-full">
                              <h3 className="font-semibold text-lg mb-1 text-gray-600">Completed</h3>
                            </div>
                          </div>
                        : null
                        }
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Top Participants</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <TopParticipants />
                  </CardContent>
                </Card>
              </div>
              </Dialog>
            </TabsContent>
            <TabsContent value="knockoutStage">
              <KoBracket koPhaseblockData={koPhaseblockData} tournamentID={tournamentID} koPhaseID={koPhaseID} participants={completeTournamentData?.tournament.participants} admins={completeTournamentData?.tournament.admins}/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}