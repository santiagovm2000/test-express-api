// src/models/user.model.ts
import { Schema, model } from "mongoose";

interface IUser {
  username: string;
  name: string;
  email: string;
  password: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: Date;
  updatedAt: Date;
}

const EMAIL_REGEX = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/;

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 100,
      match: [
        EMAIL_REGEX,
        "Invalid email format, must be a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
      uppercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);
const User = model<IUser>("User", userSchema);

export { User, IUser };
