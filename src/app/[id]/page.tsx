import { redirect } from "next/navigation";
import { isAdmin } from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";

export default async function Admin({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  if (!session?.user || !isAdmin(session.user.name)) return redirect("/");

  const tournament = await api.tournament.getById.query({
    id: params.id,
  });

  if (!tournament)
    return (
      <p className="flex h-screen w-screen items-center justify-center">
        Turnier nicht gefunden
      </p>
    );

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Turnier {tournament.name}
      </h1>

      <div className="w-full max-w-xl">
        <Table>
          <TableCaption>Liste der Teilnehmer</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Twitch Username</TableHead>
              <TableHead>Ingame Username</TableHead>
              <TableHead>Rank</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tournament.Registrations?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.User.name}</TableCell>
                <TableCell className="font-medium">
                  {user.ingameUsername}
                </TableCell>
                <TableCell className="">
                  <Badge className="bg-secondary text-primary">
                    {user.rank}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
