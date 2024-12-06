"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormEvent } from 'react';
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation"
import toast, { Toaster } from 'react-hot-toast';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [register, setRegister] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [login, setLogin] = React.useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const mode = useSearchParams().get('mode')
  const router = useRouter()

  async function onSubmitRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const res = await fetch("/api/auth/signup", {
      method: 'POST',
      body: JSON.stringify({
        name: register.username,
        email: register.email,
        password: register.password,
      }),
      headers: { "Content-Type": "application/json" }
    })

    if(!res?.ok) {
     toast.error("Please check your credentials")
    } else {
      toast.success("Account created")
      setTimeout(async () => 
      await signIn("credentials", {
        email: register.email,
        password: register.password,
        redirect: true,
      }), 800)
    }
    setIsLoading(false)
  }

  async function onSubmitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const data = await signIn("credentials", {
      email: login.email,
      password: login.password,
      redirect: false,
    });

    if(!data?.ok) {
      toast.error("Credentials are incorrect")
    } else {
      toast.success("Logging in")
      setTimeout(() =>
        router.refresh()
      , 800)
    }
    setIsLoading(false)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="grid gap-2">
        <div className="grid gap-1 space-y-4">
          <Tabs defaultValue={mode ? mode : "register"} className="md:w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="register">Registration</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>
            <TabsContent value="register">
              <form onSubmit={onSubmitRegister}>
                <Card>
                  <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                      Enter your desired username, email and a strong password below.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="usernameReg">Username</Label>
                      <Input
                        name="usernameReg"
                        id="usernameReg"
                        type="username"
                        placeholder="MaxMuster"
                        autoCapitalize="none"
                        autoCorrect="off"
                        value={register.username}
                        disabled={isLoading}
                        errorMessage={"Please enter your username"}
                        onChange={e => setRegister({...register, username: e.target.value})}
                        required = {true} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="emailReg">Email</Label>
                      <Input
                        name="emailReg"
                        id="emailReg"
                        type="email"
                        placeholder="example@gmail.com"
                        autoCapitalize="none"
                        autoCorrect="off"
                        value={register.email}
                        disabled={isLoading} 
                        errorMessage={"Invalid E-Mail!"} 
                        onChange={e => setRegister({...register, email: e.target.value})}
                        required = {true} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="passwordReg">Password</Label>
                      <Input
                        name="passwordReg"
                        id="passwordReg"
                        type="password"
                        placeholder="************"
                        autoCapitalize="none"
                        autoCorrect="off"
                        value={register.password}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}"
                        disabled={isLoading}
                        errorMessage={"Passwort not strong enough! Your password must include: \n• at least 8 characters \n• at least one upper- and lowercase Letter \n• at least one number \n• at least one special character"}
                        onChange={e => setRegister({...register, password: e.target.value})}
                        required = {true} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="confirmPasswordReg">Confirm Password</Label>
                      <Input
                        name="confirmPasswordReg"
                        id="confirmPasswordReg"
                        type="password"
                        placeholder="************"
                        autoCapitalize="none"
                        autoCorrect="off"
                        value={register.confirmPassword}
                        pattern={register.password}
                        disabled={isLoading}
                        errorMessage={"Passwort does not match"}
                        onChange={e => setRegister({...register, confirmPassword: e.target.value})}
                        required = {true} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" disabled={isLoading}>
                      {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Submit
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>
            <TabsContent value="login">
              <form onSubmit={onSubmitLogin}>
                <Card>
                  <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                      Log into your account to enjoy the best EasyTree experience.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="emailLogin">Email</Label>
                      <Input
                        name="emailLogin"
                        id="emailLogin"
                        type="email"
                        autoCapitalize="none"
                        autoCorrect="off"
                        value={login.email}
                        disabled={isLoading} 
                        errorMessage={"Please enter your email"}
                        onChange={e => setLogin({...login, email: e.target.value})}
                        required = {true} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="passwordLogin">Password</Label>
                      <Input
                        name="passwordLogin"
                        id="passwordLogin"
                        type="password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        value={login.password}
                        disabled={isLoading} 
                        errorMessage={"Please enter your password"} 
                        onChange={e => setLogin({...login, password: e.target.value})}
                        required = {true} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" disabled={isLoading}>
                      {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Login
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>

{/*
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase max-w-md">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
      <Toaster />
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
        */}
    </div>
  )
}