/* eslint-disable @typescript-eslint/no-unsafe-call */
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, password } = input;

      if (name === "" || email === "" || password === "") {
        throw new TRPCError({
          message: "field cannot be empty",
          code: "BAD_REQUEST",
        });
      }

      const existedUser = await ctx.db.user.findUnique({
        where: {
          email: email,
        },
      });

      if (existedUser) {
        throw new TRPCError({
          message: "user is already register",
          code: "BAD_REQUEST",
        });
      }

      const hashPassword: string = await bcryptjs.hash(password, 10);

      await ctx.db.user.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      });

      const user = await ctx.db.user.findUnique({
        where: {
          email: email,
        },
      });
      const token: string = jwt.sign(
        { email: email },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1h",
        },
      );
      const oneDay = 24 * 60 * 60 * 1000;

      cookies().set("token", token, {
        secure: true,
        expires: Date.now() - oneDay,
      });
      return {
        msg: "user created successfully",
        data: user,
        status: 201,
        token: token,
      };
    }),

  login: publicProcedure
    .input(
      z.object({ email: z.string() || null, password: z.string() || null }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      if (email === "" || password === "") {
        throw new TRPCError({
          message: "field cannot be empty",
          code: "BAD_REQUEST",
        });
      }

      const user = await ctx.db.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new TRPCError({
          message: "this email is not register",
          code: "BAD_REQUEST",
        });
      }

      const isPasswordCorrect: boolean = await bcryptjs.compare(
        password,
        user.password,
      );

      if (!isPasswordCorrect) {
        throw new TRPCError({
          message: "Password is not correct",
          code: "UNAUTHORIZED",
        });
      }

      const token: string = jwt.sign(
        { email: user.email, name: user.name },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" },
      );

      const oneDay = 24 * 60 * 60 * 1000;

      cookies().set("token", token, {
        secure: true,
        expires: Date.now() - oneDay,
      });
      return {
        msg: "user login successfully",
        data: user,
        status: 201,
        token: token,
      };
    }),
});
