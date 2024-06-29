import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

interface UserPayload {
  id: number; 
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const prisma = new PrismaClient();
const SECRET = '12345';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, SECRET) as UserPayload; // Type assertion para UserPayload
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });

      if (!user) {
        return res.sendStatus(403);
      }

      req.user = decoded; // Atribuir o payload decodificado ao req.user
      next();
    } catch (error) {
      console.error('JWT verification error:', error);
      return res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
};
