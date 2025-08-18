import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const jwt_sercet=process.env.JWT_SECRET as string; 

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer token"

  if (!token) return res.sendStatus(401);

  jwt.verify(token, jwt_sercet, (err, user) => {
    if (err) return res.sendStatus(403);
    (req as any).user = user; // gán vào req.user
    next();
  });
};