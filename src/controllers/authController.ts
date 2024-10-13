import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await authService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await authService.loginUser(req.body.username, req.body.password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};