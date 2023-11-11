"use client";

import { Switch } from "~/components/ui/switch";
import { api } from "~/trpc/react";
import { type RouterOutputs } from "~/trpc/shared";

export type TournamentType = RouterOutputs["tournament"]["getById"];
export function ActiveTournamentToggle({
  tournament,
}: {
  tournament: TournamentType;
}) {
  if (!tournament) return null;

  const locallTournament = api.tournament.getById.useQuery(
    {
      id: tournament.id,
    },
    {
      initialData: tournament,
    },
  );

  if (!locallTournament || !locallTournament.data) return null;

  const tournamentId = locallTournament.data.id;
  const tournamentActive = locallTournament.data.registrierungAktiv;

  const trpcHelper = api.useUtils();

  const tournamentToggle = api.tournament.toggleActive.useMutation({
    onSuccess: async () => {
      // invalidate getById
      await trpcHelper.tournament.getById.invalidate();
    },
  });
  return (
    <Switch
      checked={tournamentActive}
      onCheckedChange={async () => {
        await tournamentToggle.mutateAsync({
          id: tournamentId,
        });
      }}
    />
  );
}
