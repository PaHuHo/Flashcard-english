import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { showTopic, detailTopic, createTopic, updateTopic, removeTopic } from '../controllers/topic.controller';
import { showFlashcard, createFlashcard } from '../controllers/flashcard.controller'
import { verifyToken } from '../middleware/auth.middleware'
const router = Router();

//API login
router.post('/login', login);

//API register
router.post('/register', register);

//API update user login
router.post('/user/update', verifyToken, register);

//API CRUD Topic
router.get('/topic/show', verifyToken, showTopic);
router.get('/topic/detail', verifyToken, detailTopic);
router.post('/topic/create', verifyToken, createTopic);
router.post('/topic/update', verifyToken, updateTopic);
router.post('/topic/delete', verifyToken, removeTopic);

//API CRUD Flashcard
router.get('/flashcard/show', verifyToken, showFlashcard);
router.post('/flashcard/create', verifyToken, createFlashcard);
router.post('/flashcard/update', verifyToken, updateTopic);
router.post('/flashcard/delete', verifyToken, removeTopic);


export default router;


//  console.log('Received request param:', req.params.id); VD: url/:id => params ở đây là dữ liệu trên url
//  console.log('Received request query:', req.query.id); VD: url?id=.. => query ở đây là dữ liệu sau dau ? trên url
//  console.log('Received request body:', req.body.username); đây là dữ liệu được gửi ngầm qua http post,put,patch không thể truyền qua http get được