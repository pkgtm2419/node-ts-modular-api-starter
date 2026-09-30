import { Router } from 'express';
import { usersController } from './users.controller.js';
import { authenticateJwt } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/rbac.middleware.js';

const router = Router();

// Profile endpoint - any authenticated user
router.get('/me', authenticateJwt, usersController.getProfile);

// Admin-only listing endpoint - demonstrates RBAC
router.get('/', authenticateJwt, authorizeRoles('admin'), usersController.listAll);

export const usersRoutes = router;
