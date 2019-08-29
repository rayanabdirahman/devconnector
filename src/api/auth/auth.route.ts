import express from 'express';
import { AuthController } from './auth.controller';
import { AuthGuard } from '../../middleware/auth';

const router: express.Router = express.Router();
const authController: AuthController = new AuthController();

/**
 * @get api/auth
 * @description
 * @public
 */
router.get('/', AuthGuard, authController.authoriseUser);

/**
 * @post api/auth
 * @description
 * @public
 */
router.post('/', authController.login);

export { router };