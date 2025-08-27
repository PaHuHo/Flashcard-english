import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { show,create, update, remove } from '../controllers/topic.controller';
import {verifyToken} from '../middleware/auth.middleware'
const router = Router();

//API login
router.post('/login', login);

//API register
router.post('/register', register);

//API update user login
router.post('/user/update',verifyToken, register);

//API CRUD Topic
router.get('/topic/show',verifyToken, show);
router.get('/topic/detail',verifyToken, show);
router.post('/topic/create',verifyToken, create);
router.post('/topic/update',verifyToken, update);
router.post('/topic/delete',verifyToken, remove);

export default router;
