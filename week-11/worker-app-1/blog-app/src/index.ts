import { Hono } from "hono";
import { createUser, loginUser } from "../controller/user.controller";
import { createBlog, deleteBlog, getAllBlog, getBlog, updateBlog } from "../controller/blog.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const app = new Hono();

app.post("user/create", createUser)
app.post("user/login", loginUser)

app.use(authMiddleware)

app.post("/blog/create-blog", createBlog)
app.get("/blog", getAllBlog)
app.get("/blog/:id", getBlog)
app.put("/blog/update/:id", updateBlog)
app.delete("/blog/delete/:id", deleteBlog)

export default app;
