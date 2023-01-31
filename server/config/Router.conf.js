import userRouter from "../routes/Account.routes.js";
import postRouter from "../routes/Post.routes.js";
import commentRouter from "../routes/Comment.routes.js";
import adminRouter from '../routes/Admin.routes.js';

export const connectWithRoutes = (app) => {
    app.use("/admin", adminRouter)
    app.use("/auth", userRouter);
    app.use("/post", postRouter);
    app.use("/comment", commentRouter);
}