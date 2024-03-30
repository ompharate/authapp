import express from "express";
import connectToDb from "../services/database/connection.js";
import dotenv from "dotenv";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
const app = express();
dotenv.config();

connectToDb();
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode
  });
});
