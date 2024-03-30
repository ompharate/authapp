import express from "express";
import connectToDb from "../services/database/connection.js";
import dotenv from "dotenv";

import userRoute from "./routes/user.route.js";
const app = express();
dotenv.config();

connectToDb();

app.use("/api/user",userRoute);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
