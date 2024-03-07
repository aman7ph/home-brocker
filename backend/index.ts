import express from "express";
import mongoose from "mongoose";

const app: express.Application = express();

app.use(express.json());

app.listen(8000, () => console.log("listening on port 8000"));
