import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import path from "path";

const envPATH = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPATH });

const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, String(process.env.JWT_SECRET_KEY), {
      maxAge: "1d", // or use expiresIn: "1d"
    }) as JwtPayload;

    // Check if the token has expired
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return res.status(401).json({ message: "Token has expired" });
    }

    req.body.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default authorize;
