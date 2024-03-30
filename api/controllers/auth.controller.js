import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
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
    return res.status(400).send(error.message);
  }
  if (!user) return res.status(400).send("user not created");
  return res.status(201).json(user);
};
