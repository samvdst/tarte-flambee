import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { CreateTournament } from "../_components/create-tournament";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ActiveTournamentToggle } from "./tournamentToggle";

export default async function Admin() {
  const session = await getServerAuthSession();
  if (!session?.user || !isAdmin(session.user.name)) return redirect("/");

  const allTournaments = await api.tournament.getAll.query();

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Freddy&apos;s Admin Center
      </h1>
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-2xl text-white">
            {session && (
              <span>Angemeldet mit Twitch Account: {session.user?.name}</span>
            )}
          </p>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </div>

      <CreateTournament />

      <div className="w-full max-w-xl">
        <Table>
          <TableCaption>Eine liste deiner letzten Tourniere.</TableCaption>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[100px]">ID</TableHead> */}
              <TableHead>Name</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead className="text-right">Teilnehmer</TableHead>
              <TableHead className="text-right">Aktiv?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allTournaments.map((tournament) => (
              <TableRow key={tournament.id}>
                {/* <TableCell className="font-medium">{tournament.id}</TableCell> */}
                <TableCell>
                  <Link href={`/${tournament.id}`}>{tournament.name}</Link>
                </TableCell>
                <TableCell>{tournament.datum.toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  {tournament.Registrations.length}
                </TableCell>
                <TableCell className="text-right">
                  <ActiveTournamentToggle tournament={tournament} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
