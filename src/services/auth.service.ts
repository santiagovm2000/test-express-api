// src/services/auth.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

class AuthService {
  async login(
    username: string,
    password: string
  ): Promise<{ token: string; expiresInMinutes: number }> {
    const JWT_SECRET = process.env.JWT_SECRET!;
    const JWT_EXPIRES_IN_MINUTES = parseInt(
      process.env.JWT_EXPIRES_IN_MINUTES!
    );

    const user = await User.findOne({ username: username });

    // 1) Check if user exists and is active
    if (!user || user.status !== "ACTIVE") {
      throw new Error("Invalid credentials");
    }

    // 2) Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // 3) Make JWT token
    const payload = {
      sub: user._id.toString(),
      user: {
        username: user.username,
        name: user.name,
        email: user.email,
        status: user.status,
      },
    };
    const expiresInSeconds = JWT_EXPIRES_IN_MINUTES * 60;
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: expiresInSeconds,
    });

    return { token, expiresInMinutes: JWT_EXPIRES_IN_MINUTES };
  }
}

export default new AuthService();
