import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto:{
      type:String,
      default:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    }
  },
  { timestamp: true }
);
const User = model("user",userSchema);
export default User;