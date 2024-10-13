import { Request, Response, NextFunction } from 'express';

export const authorize = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // @ts-ignore
      if (!roles.includes(req.user.role)) {
        res.status(403).json({ message: 'Forbidden' });
        return;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};