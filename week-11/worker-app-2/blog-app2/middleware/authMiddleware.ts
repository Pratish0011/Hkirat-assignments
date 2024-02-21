import { verify } from "hono/jwt";
import { jwtSecret } from "../utils/db";
import { PrismaClient } from "@prisma/client/edge";
import { databaseUrl } from "../utils/db";
import { withAccelerate } from "@prisma/extension-accelerate";
import { ApiError } from "../src/errorHandler";

const prisma = new PrismaClient({
  datasourceUrl: databaseUrl,
}).$extends(withAccelerate());

export const authMiddleware = async (c: any, next: any) => {
  try {
    const headers = c.req.header("Authorization");
    const token = headers.replace("Bearer ", "");

    const decodedPayload = await verify(token, jwtSecret);

    const user = await prisma.user.findFirst({
      where: {
        id: decodedPayload.id,
      },
    });

    if (!user) {
      throw new ApiError(400, "Invalid token");
    }

    c.req.user = user;
    await next();
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
};
