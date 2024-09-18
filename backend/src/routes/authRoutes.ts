import express from 'express';
import authController from '../controllers/authController';
import verifyToken from '../config/verifyToken';

const router = express.Router();

router.post('/sign-up', authController.sign_up);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/user-token', verifyToken);

export default router;