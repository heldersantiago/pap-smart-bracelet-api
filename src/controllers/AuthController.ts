import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { IUserLogin } from "../types/UserLogin";
import * as dotenv from "dotenv";
import path from "path";
import { Bracelet } from "../models/Bracelet";
import { Status } from "../enums/status";

const envPATH = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPATH });

export class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const { email, password, device_id }: IUserLogin = req.body;

      const bracelet = await Bracelet.findOne<Bracelet>({
        where: {
          device_id: device_id,
        },
      });

      if (!bracelet) {
        return res.status(Status.BAD_REQUEST).json({
          errors: "Invalid Credentials",
        });
      }

      const user = await User.findOne<User>({
        where: {
          id: bracelet!.user_id,
          email: email,
        },
      });

      if (!user) {
        return res.status(Status.BAD_REQUEST).json({
          errors: "Invalid Credentials",
        });
      }

      if (!user) {
        return res.status(401).json({ errors: "Invalid credentials" });
      }

      const isPasswordMatched = user?.password === password;
      if (!isPasswordMatched) {
        return res.status(401).json({ errors: "Invalid credentials" });
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
