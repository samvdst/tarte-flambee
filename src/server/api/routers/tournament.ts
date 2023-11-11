import { z } from "zod";

import {
  createTRPCRouter,
  freddyProcedure as adminProcedure,
} from "~/server/api/trpc";

export const tournamentRouter = createTRPCRouter({
  getById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.tournament.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Registrations: {
            include: {
              User: true,
            },
          },
        },
      });
    }),

  getAll: adminProcedure.query(async ({ ctx }) => {
    return await ctx.db.tournament.findMany({
      include: {
        Registrations: {
          include: {
            User: true,
          },
        },
      },
      orderBy: {
        datum: "desc",
      },
    });
  }),

  create: adminProcedure
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

  toggleActive: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.db.tournament.findUnique({
        where: {
          id: input.id,
        },
      });
      if (tournament) {
        await ctx.db.tournament.update({
          where: {
            id: input.id,
          },
          data: {
            registrierungAktiv: !tournament.registrierungAktiv,
          },
        });
      }
    }),
});
