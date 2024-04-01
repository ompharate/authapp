import express from "express";
import { googleLoginHandler, signin, signup } from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/signin",signin);
router.post("/google/login",googleLoginHandler);
export default router;
