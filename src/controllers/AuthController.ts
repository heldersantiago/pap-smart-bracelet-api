import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { IUserLogin } from "../types/UserLogin";
import * as dotenv from "dotenv";
import path from "path";
import { Status } from "../enums/status";

const envPATH = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPATH });

export class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const { email, password, phone }: IUserLogin = req.body;
      let whereCondition: any = {};

      if (email) {
        whereCondition.email = email;
      } else if (phone) {
        whereCondition.phone = phone;
      } else {
        return res.status(Status.BAD_REQUEST).json({
          errors: "Email or phone number is required",
        });
      }

      const user = await User.findOne<User>({
        where: whereCondition,
      });

      if (!user) {
        return res
          .status(Status.BAD_REQUEST)
          .json({ errors: "Invalid credentials" });
      }

      const isPasswordMatched = user?.password === password;
      if (!isPasswordMatched) {
        return res
          .status(Status.BAD_REQUEST)
          .json({ errors: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user?.id, email: user?.email, role_id: user?.role_id },
        String(process.env.JWT_SECRET_KEY),
        {
          expiresIn: "1d",
        }
      );

      return res.status(Status.OK).json({
        token: token,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
