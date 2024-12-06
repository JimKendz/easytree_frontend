import { CreateTournamentForm } from "@/components/createTournament/createTournamentForm"

function page() {
  return (
    <div className="container flex-col space-y-6 mt-5">
      <h1 className="text-4xl text-center">Create your Tournament</h1> 
        <CreateTournamentForm />
    </div>
  )
}

export default page