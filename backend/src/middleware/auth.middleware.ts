import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';



export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const jwt_secret = process.env.JWT_SECRET as string;
  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer token"
  if (!token) return res.sendStatus(401);

  jwt.verify(token, jwt_secret, (err, user) => {
    if (err) {
      console.error("JWT Verify Error:", err);

      return res.sendStatus(403);
    }
    (req as any).user = user; // gán vào req.user
    next();
  });
};