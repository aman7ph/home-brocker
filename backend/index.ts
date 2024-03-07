import express from "express";
import dotenv from "dotenv";
import DbConnection from "./config/db";

import userRouter from "./routes/user.router";

dotenv.config();

const app: express.Application = express();

DbConnection();

app.use(express.json());
app.use("/api/user", userRouter);

app.listen(8080, () => console.log("listening on port 8080"));
