import { Request, Response, NextFunction } from 'express';

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // @ts-ignore
    const user = req.user as { role: string }; // Type assertion
    if (!roles.includes(user.role)) {
      res.status(403).json({ message: 'Access denied.' });
      return;
    }
    next();
  };
};