import express, { NextFunction, Request, Response } from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import sessionRouter from "./routes/session.route";
import authRouter from "./routes/auth.route";
import connectDB from "./utils/prisma";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/images", express.static(path.join(__dirname, "../public")));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN as unknown as string;

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/sessions", sessionRouter);

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.get("/api/healthchecker", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "How to Implement Github OAuth with Node.js",
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = 3333;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
