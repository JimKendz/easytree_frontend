"use client"

import { Button, buttonVariants } from "./ui/button"
import Image from "next/image"
import Link from 'next/link'
import { Moon, Sun } from "lucide-react"
import { useState } from "react"
import { useTheme } from "next-themes"
// import { signIn, signOut, useSession } from "next-auth/react";
import { UserNav } from "./dashboard/user-nav"
import TeamSwitcher from "./dashboard/team-switcher"
import { Session } from "next-auth";

function AuthButton({ session }: { session: Session | null }) {
  //const { data: session } = useSession();

  if (session) {
    return (
      <>
        <UserNav session={session} />
      </>
    );
  }
  return (
    <>
      <Link href="/auth?mode=login" className={buttonVariants({ variant: "default" })}>Login</Link>
    </>
  );
}
function Nav({ session }: { session: Session | null }) {
  const [menu, setMenu] = useState(false)
  const { theme, setTheme } = useTheme()
  //const { loginInfo, setLoginInfo } = useLoginContext();

  return (
    <div>
      <header>
        <nav>
          <ul className="flex items-center justify-between px-12 py-4">

            {/* 
              {menu
                        ? <X className="h-10 sm:hidden cursor-pointer" onClick={() => setMenu(!menu)} />
                        : <Menu className="h-10 sm:hidden cursor-pointer" onClick={() => setMenu(!menu)} />
                    }
                    <ul className="hidden sm:flex sm:items-center sm:justify-between sm:gap-4">
                        <li className="hover:scale-110 relative group">
                            <Link href="/ourTeam">Our Team</Link>
                            <span className="absolute -bottom-1 left-1/2 w-0 h-1 bg-green-800 group-hover:w-1/2 group-hover:transition-all"></span>
                            <span className="absolute -bottom-1 right-1/2 w-0 h-1 bg-green-800 group-hover:w-1/2 group-hover:transition-all"></span>
                        </li>
                        <li className="hover:scale-110 relative group">
                            <Link href="/contactUs">Contact Us</Link>
                            <span className="absolute -bottom-1 left-1/2 w-0 h-1 bg-green-800 group-hover:w-1/2 group-hover:transition-all"></span>
                            <span className="absolute -bottom-1 right-1/2 w-0 h-1 bg-green-800 group-hover:w-1/2 group-hover:transition-all"></span>
                        </li>
                        <li>
                            {theme === "dark"
                                ? <Button variant="outline" size="icon" onClick={() => setTheme("light")}><Sun /></Button>
                                : <Button variant="outline" size="icon" onClick={() => setTheme("dark")}><Moon /></Button>
                            }
                        </li>
              
              */}

                <div className="flex flex-row items-center">
                  <li>
                  <Link 
                    className="pointer-events-auto gap-2 p-8" 
                    href="/"
                    onClick={() => setMenu(false)}>
                        <Image
                            src="/easyTree_black.svg"
                            alt="EasyTree Logo"
                            className="dark:invert"
                            width={40}
                            height={40}
                        />
                    </Link>
                  </li>
                  { session ?
                  <li className="ml-8">
                    <TeamSwitcher />
                  </li> : null}
                  <li className="ml-8">
                    <Link
                      href="/"
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="ml-4">
                    <Link
                      href="/tournaments"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      //onClick={action()}
                    >
                      {session ?
                      "Join" : "Tournaments"}
                    </Link>
                  </li>
                  {/*<li className="ml-4">
                    <Link
                      href="/teams"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      Teams
                    </Link>
                  </li> */}
                  {session ?<div className="flex flex-row items-center">
                  <li className="ml-4">
                    <Link
                      href="/createTournament"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      Create
                    </Link>
                  </li> 
                  <li className="ml-4">
                  <Link
                    href="/myTournaments"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    My Tournaments
                  </Link>
                </li> </div>: null}
                </div>


            
            <li className="flex items-center justify-between">
              {theme === "dark"
                  ? <Button variant="outline" size="icon" onClick={() => setTheme("light")}><Sun /></Button>
                  : <Button variant="outline" size="icon" onClick={() => setTheme("dark")}><Moon /></Button>
              }
              
              {/*<ModeToggle />*/}
              <div className="ml-4">
                <AuthButton session={session} />
              </div>
            </li>
          </ul>
        </nav>
      </header>
      {menu
        ? <ul className="bg-gray-200/50 flex flex-col justify-center items-center p-2 gap-4 z-transition-all ease-in duration-500 sm:hidden">
          <li className="hover:scale-110 relative group">
            <Link href="/" onClick={() => setMenu(!menu)}>Home</Link>
            <span className="absolute -bottom-1 left-1/2 w-0 h-1 bg-green-800 group-hover:w-1/2 group-hover:transition-all"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 h-1 bg-green-800 group-hover:w-1/2 group-hover:transition-all"></span>
          </li>
          <li className="hover:scale-110 relative group">
            <Link href="/ourTeam" onClick={() => setMenu(!menu)}>Our Team</Link>
            <span className="absolute -bottom-1 left-1/2 w-0 h-1 bg-green-800 group-hover:w-1/2 group-hover:transition-all"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 h-1 bg-green-800 group-hover:w-1/2 group-hover:transition-all"></span>
          </li>
          <li className="hover:scale-110 relative group">
            <Link href="/contactUs" onClick={() => setMenu(!menu)}>Contact Us</Link>
            <span className="absolute -bottom-1 left-1/2 w-0 h-1 bg-green-800 group-hover:w-1/2 group-hover:transition-all"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 h-1 bg-green-800 group-hover:w-1/2 group-hover:transition-all"></span>
          </li>
          <li className="">
            <Link href="/auth/login" className={buttonVariants({ variant: "default" })} onClick={() => setMenu(!menu)}>Login</Link>
          </li>
        </ul>
        : <></>
      }
    </div>
  )
}

export default Nav