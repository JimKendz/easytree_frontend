import Navbar from "./Navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth"

export default async function Nav() {
  const session = await getServerSession(authOptions);
  return <Navbar session={session} />;
}
