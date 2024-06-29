import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  res.json(post);
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;
  const newPost = await prisma.post.create({
    data: { title, content, authorId }
  });
  res.json(newPost);
};
