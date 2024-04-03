import express from "express";
import { googleLoginHandler, signOut, signin, signup } from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/signin",signin);
router.post("/google/login",googleLoginHandler);
router.get('/signout',signOut);
export default router;
