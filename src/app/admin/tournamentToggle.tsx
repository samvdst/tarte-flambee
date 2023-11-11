"use client";

import { Switch } from "~/components/ui/switch";
import { api } from "~/trpc/react";

export function ActiveTournamentToggle({
  tournamentId,
  active,
}: {
  tournamentId: string;
  active: boolean;
}) {
  const tournamentToggle = api.tournament.toggleActive.useMutation();
  return (
    <Switch
      checked={active}
      onCheckedChange={async () => {
        await tournamentToggle.mutateAsync({
          id: tournamentId,
        });
      }}
    />
  );
}
