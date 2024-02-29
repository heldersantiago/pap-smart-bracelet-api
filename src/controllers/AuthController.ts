import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { IUserLogin } from "../types/UserLogin";
import * as dotenv from "dotenv";
import path from "path";

const envPATH = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPATH });

export class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const { email, password }: IUserLogin = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isPasswordMatched = user?.password === password;
      if (!isPasswordMatched) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user?.id, email: user?.email },
        String(process.env.JWT_SECRET_KEY),
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({
        token: token,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
