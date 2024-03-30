import express from "express"
import connectToDb from "../services/database/connection.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

connectToDb();
app.listen(3000,()=>{
    console.log("http://localhost:3000");
})