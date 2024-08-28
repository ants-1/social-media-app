import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.get('/sign_up', authController.sign_up);

router.get('/login', authController.login);

router.get('/logout', authController.logout);

export default router;