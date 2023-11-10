"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateTournament() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());

  const createTournament = api.tournament.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setDate(new Date());
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTournament.mutate({
          name,
          date,
        });
      }}
      className="flex flex-col gap-2"
    >
      <label>
        <span>Tournier Name</span>
        <input
          type="text"
          placeholder="Tournament Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
      </label>
      <label>
        <span>Datum</span>
        <input
          type="date"
          value={date.toISOString()}
          // onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
      </label>
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
