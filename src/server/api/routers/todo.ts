import { z } from "zod";
import { type Category, type Task } from "@prisma/client";

import { Prisma } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import dayjs from "dayjs";

/**
 * Default selector for Todos.
 * It's important to always explicitly say which fields to avoid
 * leaking information the client does not need to see.
 * Just know that this is the same as the SELECT statement for SQL.
 */
// ! DEPRECATED, MUST USE RAW SQL instead.
// const defaultTaskSelect = Prisma.validator<Prisma.TaskSelect>()({
//   id: true,
//   description: true,
//   status: true,
//   due_date: true,
//   category_name: true,
// });

// Important: The procedures (think of as API endpoints) that will allows
// us to read and write to our database.
export const todoRouter = createTRPCRouter({
  // * Procedure for getting all tasks based on filters.
  getAllTasks: publicProcedure
    .input(z.object({ dateFilter: z.string().nullish() }))
    .query(async ({ ctx, input }) => {
      let tasks: Task[];
      const CURRENT_DATE = dayjs();
      // * SQL Statement is in the back-ticks.
      switch (input.dateFilter) {
        case "today":
          tasks = await ctx.prisma
            .$queryRaw`SELECT * FROM Task WHERE due_date == ${CURRENT_DATE.endOf(
            "day"
          )} ORDER BY priority ASC`;
          break;
        case "tomorrow":
          tasks = await ctx.prisma
            .$queryRaw`SELECT * FROM Task WHERE due_date == ${CURRENT_DATE.add(
            1,
            "day"
          ).endOf("day")} ORDER BY priority ASC`;
          break;
        case "next-week":
          tasks = await ctx.prisma
            .$queryRaw`SELECT * FROM Task WHERE due_date <= ${CURRENT_DATE.add(
            7,
            "day"
          ).endOf("day")} AND due_date >= ${CURRENT_DATE.startOf(
            "day"
          )}ORDER BY priority ASC, due_date DESC`;
          break;
        default:
          tasks = await ctx.prisma
            .$queryRaw`SELECT * FROM Task ORDER BY priority ASC`;
      }

      return tasks;
    }),
  // * Procedure for getting all categories.
  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    // * SQL Statement is in the back-ticks.
    const categories: Category[] = await ctx.prisma
      .$queryRaw`SELECT * FROM Category`;

    return categories;
  }),
  // * Procedure for getting all tasks based on categories.
  getTasksByCategory: publicProcedure
    .input(
      z.object({ category_name: z.string(), dateFilter: z.string().nullish() })
    )
    .query(async ({ ctx, input }) => {
      // * SQL Statement is in the back-ticks.
      let tasks: Task[];
      const CURRENT_DATE = dayjs();
      // * SQL Statement is in the back-ticks.
      switch (input.dateFilter) {
        case "today":
          tasks = await ctx.prisma
            .$queryRaw`SELECT * FROM Task WHERE category_name = ${
            input.category_name
          } AND due_date == ${CURRENT_DATE.endOf("day")} ORDER BY priority ASC`;
          break;
        case "tomorrow":
          tasks = await ctx.prisma
            .$queryRaw`SELECT * FROM Task WHERE category_name = ${
            input.category_name
          } AND due_date == ${CURRENT_DATE.add(1, "day").endOf(
            "day"
          )} ORDER BY priority ASC`;
          break;
        case "next-week":
          tasks = await ctx.prisma
            .$queryRaw`SELECT * FROM Task WHERE category_name = ${
            input.category_name
          } AND due_date <= ${CURRENT_DATE.add(7, "day").endOf(
            "day"
          )} ORDER BY priority ASC, due_date DESC`;
          break;
        default:
          tasks = await ctx.prisma
            .$queryRaw`SELECT * FROM Task WHERE category_name = ${input.category_name} ORDER BY priority ASC`;
      }
      return tasks;
    }),
  // * Procedure for creating a task
  createTask: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        priority: z.number().int(),
        due_date: z.date().or(z.string()),
        category: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // * SQL statement is in the back-ticks.

      // Convert date to be the end of the day using dayjs library.
      const FORMATTED_DATE = dayjs(input.due_date).endOf("day");
      let task: Task;

      // If a category is provided, insert it into the database.
      // Falsy values are null, undefined, NaN, 0, false, and "". So if a category is provided, it will be truthy.
      if (input.category) {
        task = await ctx.prisma
          .$queryRaw`INSERT INTO Task(name, description, priority, due_date, category_name) VALUES (${input.name},${input.description},${input.priority}, ${FORMATTED_DATE}, ${input.category})`;
      } else {
        task = await ctx.prisma
          .$queryRaw`INSERT INTO Task(name, description, priority, due_date) VALUES (${input.name},${input.description},${input.priority}, ${FORMATTED_DATE})`;
      }

      return task;
    }),
  // * Procedure for updating the status of a task
  changeStatus: publicProcedure
    .input(z.object({ taskId: z.number(), currentStatus: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const NEW_STATUS =
        input.currentStatus === "active" ? "completed" : "active";
      const task: Task = await ctx.prisma
        .$queryRaw`UPDATE Task SET status = ${NEW_STATUS} WHERE id = ${input.taskId}`;

      return task;
    }),
  // * Procedure for deleting a task
  deleteTask: publicProcedure
    .input(z.object({ taskId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const task: Task = await ctx.prisma
        .$queryRaw`DELETE FROM Task WHERE id = ${input.taskId}`;

      return task;
    }),
  // * Procedure for creating a category, throws an error if category does already exist.
  createCategory: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const category: Category = await ctx.prisma
          .$queryRaw`INSERT INTO Category(name) VALUES (${input.name})`;

        return category;
      } catch (error) {
        // In case the category already exists, throw an error.
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2010" // P2010 is the error code for unique constraint violation
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Category already exists",
          });
        }

        // ! If the prisma error is not due to a unique contraint violation,
        // ! throw an internal server error.
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  // * Procedure for deleting a category.
  deleteCategory: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // If a category is deleted, all tasks that are associated with it will have
      // their category_name set to null.
      await Promise.all([
        ctx.prisma.$queryRaw`DELETE FROM Category WHERE name = ${input.name}`,
        ctx.prisma.$executeRaw`
        UPDATE Task
        SET category_name = null
        WHERE category_name = ${input.name}`,
      ]);
    }),
  generateReport: publicProcedure
    .input(z.object({ startDate: z.date(), endDate: z.date() }))
    .query(async ({ ctx, input }) => {
      const FORMATTED_START_DATE = dayjs(input.startDate).startOf("day");
      const FORMATTED_END_DATE = dayjs(input.endDate).endOf("day");
      const tasks: Task[] = await ctx.prisma
        .$queryRaw`SELECT * FROM Task WHERE due_date >= ${FORMATTED_START_DATE} AND due_date <= ${FORMATTED_END_DATE}`;

      return tasks;
    }),
});
