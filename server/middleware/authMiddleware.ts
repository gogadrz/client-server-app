import { Request, Response, NextFunction } from "express";
import { ICandidatVid } from "../models/candidatVid";
const jwt = require("jsonwebtoken");

interface AuthenticatedRequest extends Request {
  user?: ICandidatVid;
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Не авторизован!" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Не авторизован!" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Не авторизован!" });
  }
};

export default authMiddleware;
