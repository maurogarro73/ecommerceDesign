import express from 'express';
import passport from 'passport';
import { isAdmin, isUser } from '../middleware/auth.js';
import { authController } from '../controllers/auth.controller.js';

export const authRouter = express.Router();

authRouter.get('/perfil', isUser, authController.perfil);
authRouter.get('/admin', isUser, isAdmin, authController.admin);
authRouter.get('/logout', authController.logout);
authRouter.get('/login', authController.renderLogin);
authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), authController.login);
authRouter.get('/faillogin', authController.failLogin);
authRouter.get('/register', authController.renderRegister);
authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), authController.register);
authRouter.get('/failregister', authController.failRegister);
authRouter.get('/session', authController.session);
