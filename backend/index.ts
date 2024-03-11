import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import DbConnection from "./config/db";
import cors from "cors";
import authRouter from "./routes/auth.router";
import userRouter from "./routes/user.router";

dotenv.config();

const app: express.Application = express();

DbConnection();

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173", // Only accept requests from this origin
  credentials: true, // Allow credentials (cookies, authentication, etc.)
};

app.use(cors(corsOptions));
app.use(cookieParser());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = (err as any)?.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).send({
    success: false,
    statusCode,
    message,
  });
});

app.listen(8080, () => console.log("listening on port 8080"));
