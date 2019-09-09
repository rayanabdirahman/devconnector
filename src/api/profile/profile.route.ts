import { ProfileController } from './profile.controller';
import express from 'express';
import { AuthGuard } from '../../middleware/auth';

const router: express.Router = express.Router();
const profileController: ProfileController = new ProfileController();
/**
 * @get api/profile/me
 * @description Get current user's profile
 * @private
 */
router.get('/me', AuthGuard, profileController.getCurrentUserProfile);

export { router };