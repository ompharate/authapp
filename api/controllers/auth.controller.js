import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getToken } from "../../services/tokenManager.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  let user;
  try {
    user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return next(error);
  }
  if (!user)
    return res.status(400).json({
      success: false,
      message: "user not created",
    });
  return res.status(201).json(user);
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    return next(error);
  }
  if (!user)
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  const isMatch = bcryptjs.compareSync(password, user.password);
  if (!isMatch)
    return res.status(401).json({
      success: false,
      message: "invalid password",
    });

  const token = getToken(user);
  const expiryDate = new Date(Date.now() + 3600000); // 1 hour
  return res
    .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
    .status(200)
    .json({
      success: true,
      message: "user found",
      user,
    });
};
