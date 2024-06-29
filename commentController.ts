import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getComments = async (req: Request, res: Response) => {
  const comments = await prisma.comment.findMany();
  res.json(comments);
};

export const getComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const comment = await prisma.comment.findUnique({ where: { id: Number(id) } });
  res.json(comment);
};

export const createComment = async (req: Request, res: Response) => {
  const { content, postId, userId } = req.body;
  const newComment = await prisma.comment.create({
    data: { content, postId, userId }
  });
  res.json(newComment);
};
