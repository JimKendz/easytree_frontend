import { Metadata } from "next"
import Image from "next/image"
import { UserAuthForm } from "@/components/user-auth-form"
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default async function AuthenticationPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  
  return (
    <>
      <div className="container relative mt-12 flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2">
        <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
          <div className="absolute"/>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            EasyTree
          </div>
          <div className="flex justify-center mb-6">
            <Image
              src="/CompetitionIcon.png"
              width={500}
              height={500}
              alt="Competition Icon"
            />
          </div>
          <div className="relative z-20 mt-auto text-center">
            <blockquote className="space-y-2">
              <h3 className="text-2xl">
                Tournaments made easy!
              </h3>
              <footer className="text-sm">Create and manage tournament trees to compete against your friends and competitors</footer>
            </blockquote>
          </div>
        </div>
          <div className="mx-auto flex max-w-80 max-w-sm flex-col justify-center space-y-6">
            <UserAuthForm />
          </div>
        </div>
    </>
  )
}