import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import TokenPayloadDTO from "../types/dto/tokenPayloadDto";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
     res.status(401).json({ message: 'Unauthorized' });
     return
  }
};

export default authenticate;