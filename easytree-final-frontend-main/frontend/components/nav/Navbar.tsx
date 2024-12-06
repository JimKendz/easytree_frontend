"use client"

import { Button, buttonVariants } from "../ui/button"
import Image from "next/image"
import Link from 'next/link'
import { Menu, Moon, Sun, X } from "lucide-react"
import { useState } from "react"
import { useTheme } from "next-themes"
import { UserNav } from "./user-nav"
import TournamentSwitcher from "./tournament-switcher"
import { Session } from "next-auth";
import { signOut } from "next-auth/react"

function AuthButton({ session }: { session: Session | null }) {
  if (session) {
    return (
      <>
        <UserNav session={session} />
      </>
    );
  }
  return (
    <Link href="/auth?mode=login" className={buttonVariants({ variant: "default" })}>Login</Link>
  );
}

export default function Navbar({ session }: { session: Session | null }) {
  const [menu, setMenu] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <header>
        <nav className="flex justify-between p-5">
          <Link
            className="flex basis-1/3 pointer-events-auto p-2"
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
          {session
            ? <>
              <ul className="hidden sm:flex sm:basis-full sm:justify-center sm:mt-5">
                <li>
                  <TournamentSwitcher className="hidden lg:flex lg:mr-1 lg:-mt-2 xl:mr-6" />
                </li>
                <li className="px-4">
                  <Link
                    href="/tournaments"
                    className="text-base text-muted-foreground transition-colors hover:text-primary hover:underline hover:underline-offset-4">
                    Join
                  </Link>
                </li>
                <li className="px-4">
                  <Link
                    href="/createTournament"
                    className="text-base text-muted-foreground transition-colors hover:text-primary hover:underline hover:underline-offset-4">
                    Create
                  </Link>
                </li>
                <li className="px-4">
                  <Link
                    href="/myTournaments"
                    className="text-base text-muted-foreground transition-colors hover:text-primary hover:underline hover:underline-offset-4">
                    My Tournaments
                  </Link>
                </li>
              </ul>
            </>
            : <ul className="hidden sm:flex sm:mt-5">
              <li className="">
                <Link
                  href="/tournaments"
                  className="text-base text-muted-foreground transition-colors hover:text-primary hover:underline hover:underline-offset-4">
                  Tournaments
                </Link>
              </li>
            </ul>
          }

          <div className="hidden sm:flex sm:basis-1/3 sm:justify-end sm:p-2">
            {theme === "dark"
              ? <Button className="mr-4" variant="outline" size="icon" onClick={() => setTheme("light")}><Sun /></Button>
              : <Button className="mr-4" variant="outline" size="icon" onClick={() => setTheme("dark")}><Moon /></Button>
            }
            <AuthButton session={session} />
          </div>
          {menu
            ? <X className="flex h-10 sm:hidden cursor-pointer" width={30} onClick={() => setMenu(!menu)} />
            : <Menu className="flex h-10 sm:hidden cursor-pointer" width={30} onClick={() => setMenu(!menu)} />
          }
        </nav>
      </header>
      {menu
        ? <ul className="bg-primary-foreground outline flex flex-col justify-center items-center py-5 gap-4 z-transition-all ease-in duration-500 sm:hidden">
          {session
            ? <>
              <li>
                <div className="p-4">
                  <p className="text-xl font-bold mb-1 leading-none">Hello {session.user.name}, </p>
                  <p className="text-md font-small leading-none text-muted-foreground">welcome back!</p>
                </div>
              </li>
              <li className="">
                <Link
                  href="/tournaments"
                  className="text-base text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setMenu(!menu)}>
                  Join
                </Link>
              </li>
              <li className="">
                <Link
                  href="/createTournament"
                  className="text-base text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setMenu(!menu)}>
                  Create
                </Link>
              </li>
              <li className="">
                <Link
                  href="/myTournaments"
                  className="text-base text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setMenu(!menu)}>
                  My Tournaments
                </Link>
              </li>
              <li>
                {theme === "dark"
                  ? <Button className="mt-2" variant="outline" size="icon" onClick={() => setTheme("light")}><Sun /></Button>
                  : <Button className="mt-2" variant="outline" size="icon" onClick={() => setTheme("dark")}><Moon /></Button>
                }
              </li>
              <li>
                <Button onClick={() => signOut()}>Logout</Button>
              </li>
            </>
            : <>
              <li>
                <div className="p-4">
                  <p className="text-xl font-bold mb-1 leading-none">Welcome! </p>
                </div>
              </li>
              <li className="">
                <Link
                  href="/tournaments"
                  className="text-base text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setMenu(!menu)}>
                  Tournaments
                </Link>
              </li>
              <li className="grid grid-flow-col gap-5 mt-3">
                <Link href="/auth?mode=register" className={buttonVariants({ variant: "secondary" })} onClick={() => setMenu(!menu)}>Register</Link>
                <Link href="/auth?mode=login" className={buttonVariants({ variant: "default" })} onClick={() => setMenu(!menu)}>Login</Link>
              </li>
            </>
          }
        </ul>
        : <></>
      }
    </div>
  )
}