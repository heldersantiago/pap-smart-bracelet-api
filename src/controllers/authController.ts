import { Request, Response } from "express";
import { User } from "../models/user";
import { JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { ILoginForm } from "../types/LoginForm";

export class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const { email, password }: ILoginForm = req.body;

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
        "hsjmzj8w8JJSH8833ssjjJu@Wjwtsssu7",
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
