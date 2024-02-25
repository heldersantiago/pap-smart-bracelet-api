import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    const decode = jwt.verify(token, "heldersantiago273");
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
