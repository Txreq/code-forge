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
    })).mutation(async ({ ctx, input }) => {
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
      answer: z.string(),
      bookmark_id: z.string()
    })).mutation(async ({ ctx: { db, session }, input }) => {
      try {
        const user_id = session.user.id;

        db.$transaction(async () => {
          const savedAnswer = await db.answer.create({
            data: {
              content: input.answer
            }
          })

          await db.question.create({
            data: {
              user_id,
              content: input.prompt,
              answer_id: savedAnswer.id,
              bookmark_id: input.bookmark_id
            },
          })
        });

        return true
      } catch {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "failed to save user\'s question"
        })
      }
    }),
    list: protectedProcedure.input(z.object({
      limit: z.number().min(1).max(10).default(10),
      cursor: z.string().optional(),
      bookmark_id: z.string(),
    })).query(async ({ ctx, input: { limit, cursor, bookmark_id } }) => {
      const user_id = ctx.session.user.id;

      const questions = await ctx.db.question.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          datetime: "desc"
        },
        where: {
          user_id,
          AND: {
            bookmark_id
          }
        },
        include: {
          answer: true
        }
      })

      let nextCursor: typeof cursor | undefined = undefined;
      if (questions.length > limit) {
        // eslint-disable-next-line
        const nextItem = questions.pop() as (typeof questions)[number]
        if (!!nextItem) {
          nextCursor = nextItem.id
        }
      }

      return { questions, nextCursor }
    })
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;
