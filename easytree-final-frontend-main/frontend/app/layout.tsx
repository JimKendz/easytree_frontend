import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Nav from '@/components/nav/navWrapper'
import SessionProvider from '@/components/SessionProvider'
import { getServerSession } from "next-auth";
import { cn } from '@/lib/utils'
import { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'EasyTree',
  description: 'Tournaments made easy.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <SessionProvider session={session}>
        <head />
        <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main>
              <Suspense fallback="...">
                <Nav />
              </Suspense>

              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  )
}
