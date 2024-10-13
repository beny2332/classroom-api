import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import TokenPayloadDTO from "../types/dto/tokenPayloadDto";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: string | undefined = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: 'Access denied. No token provided.' });
      return;
    }

    const decoded: TokenPayloadDTO = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayloadDTO;

    // @ts-ignore
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
};

export default authenticate;