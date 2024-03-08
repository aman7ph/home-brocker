import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import DbConnection from "./config/db";

import userRouter from "./routes/user.router";

dotenv.config();

const app: express.Application = express();

DbConnection();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(express.json());
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
