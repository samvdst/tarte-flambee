"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

type allowedRanks =
  | "iron"
  | "bronze"
  | "silber"
  | "gold"
  | "platin"
  | "diamond"
  | "master"
  | "grandmaster";

export function RegisterTart() {
  const router = useRouter();
  const [ingameUsername, setIngameUsername] = useState("");
  const [rank, setRank] = useState("iron");

  const registerForTartFlambe = api.registration.register.useMutation({
    onSuccess: () => {
      router.refresh();
      setIngameUsername("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        registerForTartFlambe.mutate({
          ingameUsername,
          rank: rank as allowedRanks,
        });
      }}
      className="flex flex-col gap-2"
    >
      <select
        placeholder="Ingame Username"
        value={rank}
        onChange={(e) => setRank(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      >
        <option value="iron">Iron</option>
        <option value="bronze">Bronze</option>
        <option value="silver">Silver</option>
        <option value="gold">Gold</option>
        <option value="platinum">Platinum</option>
        <option value="diamond">Diamond</option>
      </select>

      <input
        type="text"
        placeholder="Ingame Username"
        value={ingameUsername}
        onChange={(e) => setIngameUsername(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={registerForTartFlambe.isLoading}
      >
        {registerForTartFlambe.isLoading
          ? "Registrierung läuft..."
          : "Registrieren"}
      </button>
    </form>
  );
}
