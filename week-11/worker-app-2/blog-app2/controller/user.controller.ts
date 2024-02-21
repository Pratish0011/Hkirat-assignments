import { PrismaClient } from "@prisma/client/edge";
import { databaseUrl, jwtSecret } from "../utils/db";
import { withAccelerate } from "@prisma/extension-accelerate";
import { ApiError } from "../src/errorHandler";
import { z } from "zod";
import { sign } from "hono/jwt";

const prisma = new PrismaClient({
  datasourceUrl: databaseUrl,
}).$extends(withAccelerate());

interface SignUpUser {
  username: string;
  email: string;
  password: string;
}

const UserSchema = z.object({
  username: z.string().min(3),
  email: z.string().endsWith(".com"),
  password: z.string().min(3),
});

// type schema = z.infer<typeof UserSchema>

export const createUser = async (c: any) => {
  const body: SignUpUser = await c.req.json();

  const result = UserSchema.safeParse(body);

  if (!result.success) {
    throw new ApiError(404, result.error.message);
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (existingUser) {
    throw new ApiError(400, `User ${existingUser.username} already exists`);
  }

  const newUser = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      password: body.password,
    },
    select: {
      username: true,
      email: true,
    },
  });

  return c.json({
    ok: true,
    message: "User created successfully",
  });
};

// ***********************************************************

type SignInUser = Pick<SignUpUser, "email" | "password">;

const UserData = z.object({
  email: z.string().endsWith(".com"),
  password: z.string().min(3),
});

export const loginUser = async (c: any) => {
  const body: SignInUser = await c.req.json();

  const result = UserData.safeParse(body);

  if (!result.success) {
    throw new ApiError(404, result.error.message);
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }

  console.log(typeof existingUser);

  const payload = existingUser;

  const token = await sign(payload, jwtSecret, "HS256");

  return c.json({
    ok: true,
    msg: existingUser,
    token: token,
  });
};
