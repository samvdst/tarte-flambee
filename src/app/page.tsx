import Link from "next/link";

import { RegisterTart } from "~/app/_components/register-tart";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { CreateTournament } from "./_components/create-tournament";
import { isAdmin } from "~/server/api/trpc";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Willkommen zum Tart Flambe
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
            <h3 className="text-2xl font-bold">1. Mit Twitch einloggen</h3>
            <div className="text-lg">
              Damit dich Freddy kontaktieren kann falls du gewinnen solltest.
            </div>
          </div>
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
            <h3 className="text-2xl font-bold">2. Registrieren</h3>
            <div className="text-lg">
              Damit Freddy die übersicht behält und dich zum ingame Turnier
              einladen kann.
            </div>
          </div>
        </div>
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

        <FreddyView />
        <PlayerShowcase />
      </div>
    </main>
  );
}

async function FreddyView() {
  const session = await getServerAuthSession();
  if (!session?.user || !isAdmin(session.user.name)) return null;

  const allTournaments = await api.tournament.getAllTournaments.query();

  return (
    <div className="w-full max-w-lg">
      <h2 className="text-3xl font-bold">Freddy View</h2>
      {allTournaments.length == 0 && (
        <>
          <CreateTournament />
          <p className="mb-3">Keine Turniere</p>
        </>
      )}

      {allTournaments.map((tournament) => (
        <>
          <h3 className="text-2xl font-bold">Du bist registriert</h3>
          <p>
            Rank: <span className="font-mono">{tournament.name}</span>
            Rank:{" "}
            <span className="font-mono">{tournament.datum.toISOString()}</span>
          </p>
        </>
      ))}
    </div>
  );
}

async function PlayerShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const activeTartFlambe = await api.registration.getActiveTartFlambe.query();
  if (!activeTartFlambe) return <p>Kein Tart Flambe aktiv</p>;

  const myRegistration = await api.registration.getMyRegistration.query();

  return (
    <div className="w-full max-w-lg">
      {myRegistration ? (
        <>
          <h3 className="text-2xl font-bold">Du bist registriert</h3>
          <p>
            Rank: <span className="font-mono">{myRegistration.rank}</span>
          </p>
          <p className="font-mono">
            Ingame Benutzer:{" "}
            <span className="font-mono">{myRegistration.ingameUsername}</span>
          </p>
        </>
      ) : (
        <>
          <p className="mb-3">Du bist noch nicht registriert.</p>
          <RegisterTart />
        </>
      )}
    </div>
  );
}
