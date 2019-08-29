import express from 'express';
import { AuthController } from './auth.controller';
import { AuthGuard } from '../../middleware/auth';

const router: express.Router = express.Router();
const authController: AuthController = new AuthController();

/**
 * @get api/users
 * @description Test route
 * @public
 */
router.get('/', AuthGuard, authController.authoriseUser);

export { router };