import { z } from "zod";

import { createTRPCRouter, freddyProcedure } from "~/server/api/trpc";

export const tournamentRouter = createTRPCRouter({
  getAllTournaments: freddyProcedure.query(async ({ ctx }) => {
    return await ctx.db.tournament.findMany();
  }),

  create: freddyProcedure
    .input(
      z.object({
        name: z.string(),
        date: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.tournament.create({
        data: {
          name: input.name,
          registrierungAktiv: false,
          datum: input.date,
        },
      });
    }),
});
