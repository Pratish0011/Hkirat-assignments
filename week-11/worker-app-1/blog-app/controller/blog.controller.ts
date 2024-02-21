import { PrismaClient } from "@prisma/client/edge";
import { databaseUrl } from "../utils/db";
import { withAccelerate } from "@prisma/extension-accelerate";
import { ApiError } from "../src/errorHandler";

const prisma = new PrismaClient({
  datasourceUrl: databaseUrl,
}).$extends(withAccelerate());

interface BlogPost {
  title: string;
  body: string;
}

export const createBlog = async (c: any) => {
  const body: BlogPost = await c.req.json();

  const createBlog = await prisma.blog.create({
    data: {
      title: body.title,
      body: body.body,
      userId: c.req.user.id,
    },
  });

  if (!createBlog) {
    throw new ApiError(400, "Failed to create blog");
  }

  return c.json({
    ok: true,
    data: createBlog,
    msg: "Blog created successfully",
  });
};

export const getAllBlog = async (c: any) => {
  const allBlog = await prisma.blog.findMany({
    where: {
      userId: c.req.user.id,
    },
    select: {
      id: true,
      title: true,
      body: true,
      userId: true,
    },
  });

  return c.json({
    ok: "True",
    data: allBlog,
    msg: "Fetch all the blogs successfully",
  });
};

export const getBlog = async (c: any) => {
  const blogId = c.req.param("id");

  if (!blogId) {
    throw new ApiError(400, "ID not found");
  }

  const blog = await prisma.blog.findFirst({
    where: {
      id: parseInt(blogId),
    },
    select: {
      id: true,
      title: true,
      body: true,
    },
  });

  return c.json({
    ok: true,
    data: blog,
    msg: "Successfully fetch the blog",
  });
};

export const updateBlog = async (c: any) => {
  const blogId = c.req.param("id");
  const body: BlogPost = await c.req.json();

  if (!blogId) {
    throw new ApiError(400, "ID not found");
  }

  const updatedBlog = await prisma.blog.update({
    where: {
      id: parseInt(blogId),
    },
    data: {
      title: body.title,
      body: body.body,
    },
  });

  return c.json({
    ok: true,
    data: updatedBlog,
    msg: "Blog updated successfully",
  });
};

export const deleteBlog = async (c: any) => {
  const blogId = c.req.param("id");

  if (!blogId) {
    throw new ApiError(404, "ID not found");
  }

  const deletedBlog = await prisma.blog.delete({
    where: {
      id: parseInt(blogId),
    },
  });

  return c.json({
    ok: true,
    data: {},
    msg: "Blog deleted successfully",
  });
};
