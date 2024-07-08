import { verify } from "crypto";
import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Please provide password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
