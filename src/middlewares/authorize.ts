import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import path from "path";

const envPATH = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPATH });

const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    const decode = jwt.verify(token, String(process.env.JWT_SECRET));
    req.body.user = decode;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid Token" });
  }
};

export default authorize;
