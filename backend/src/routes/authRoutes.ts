import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/sign-up', authController.sign_up);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

export default router;