import { Router } from 'express';
import { authController } from './auth.controller.js';
import { validateRequest } from '../../middlewares/validate.middleware.js';
import { registerSchema, loginSchema } from './auth.schema.js';

const router = Router();

router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);

export const authRoutes = router;
