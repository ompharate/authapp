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

export const googleLoginHandler = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("ok in if")
      const token = getToken(user);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      return res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({
        success: true,
        message: "user found",
        user,
      });


    } else {
      console.log("ok in else");
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = await User.create({
        username: req.body.name.split(' ').join("").toLowerCase(),
        email: req.body.email,
        profilePhoto: req.body.photo,
        password: hashedPassword,
      });

      const token = getToken(newUser);
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      return res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json({
          success: true,
          message: "user found",
          newUser,
        });

    }
  } catch (error) {
    next(error);
  }
};

export const signOut = (req,res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
}