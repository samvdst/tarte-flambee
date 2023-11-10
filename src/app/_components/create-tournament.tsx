"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { Calendar } from "~/components/ui/calendar";

import { api } from "~/trpc/react";

export function CreateTournament() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const createTournament = api.tournament.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setDate(undefined);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!date) return;
        createTournament.mutate({
          name,
          date,
        });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Tournier Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createTournament.isLoading}
      >
        {createTournament.isLoading
          ? "Erstellung läuft..."
          : "Tournier erstellen"}
      </button>
    </form>
  );
}
