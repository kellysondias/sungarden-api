import { verify } from "jsonwebtoken";
import User from "../services/user.service";
import { NextFunction, Request, Response } from "express";

export const loginAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const token = authorization.replace("Bearer", "").trim();
  try {
    const decoded = verify(token, global.app_config.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.body = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid" });
  }
};
