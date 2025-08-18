import { Router } from 'express';
import { test, register, login } from '../controllers/auth.controller';
import {verifyToken} from '../middleware/auth.middleware'
const router = Router();

//API login
router.post('/login', login);

//API register
router.post('/register', register);

//API get user login
router.get('/me',verifyToken, register);

//API CRUD

export default router;
