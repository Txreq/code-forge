import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const appRouter = createTRPCRouter({
  auth: createTRPCRouter({
    user: protectedProcedure.query(async ({ ctx }) => {
      try {
        const session = ctx.session
        return session?.user
      } catch {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "unauthorized access"
        })
      }
    }),
  }),
  bookmark: createTRPCRouter({
    create: protectedProcedure.input(z.object({
      title: z.string()
    })).query(async ({ ctx, input }) => {
      try {
        return (await ctx.db.bookmark.create({
          data: {
            title: input.title,
            user_id: ctx.session.user.id
          }
        }))
      } catch {
        throw new TRPCError({ code: "BAD_REQUEST", message: "failed to save bookmark" })
      }
    }),
    list: protectedProcedure.query(async ({ ctx }) => {
      return (await ctx.db.bookmark.findMany({ where: { user_id: ctx.session.user.id } }))
    })
  }),
  question: createTRPCRouter({
    save: protectedProcedure.input(z.object({
      prompt: z.string(),
      answer: z.string()
    })).mutation(async ({ ctx: { db, session }, input }) => {
      try {
        const user_id = session.user.id;

        const savedAnswer = await db.answer.create({
          data: {
            content: input.answer
          }
        })

        const savedQuestion = await db.question.create({
          data: {
            user_id,
            content: input.prompt,
            answer_id: savedAnswer.id
          }
        })

        return savedQuestion
      } catch {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "failed "
        })
      }
    }),
    list: protectedProcedure.input(z.object({
      limit: z.number().min(1).max(5).default(5),
      cursor: z.string().nullish()
    })).query(async ({ ctx, input: { limit, cursor } }) => {
      const user_id = ctx.session.user.id;

      const questions = await ctx.db.question.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          datetime: "asc"
        },
        where: {
          user_id
        },
        include: {
          answer: true
        }
      })

      let nextCursor: typeof cursor | undefined = undefined;
      if (questions.length > limit) {
        const nextItem = questions.pop() as (typeof questions)[number]
        nextCursor = nextItem.id
      }

      return { questions, nextCursor }
    })
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;
