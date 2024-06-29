import { Router } from 'express';
import { getUsers, getUser, createUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getUsers);
router.get('/:id', authMiddleware, getUser);
router.post('/', authMiddleware, createUser);

export default router;
