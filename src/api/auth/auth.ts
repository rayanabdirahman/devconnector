import express from 'express';
import { AuthGuard } from '../../middleware/auth';
const router: express.Router = express.Router();

/**
 * @get api/users
 * @description Test route
 * @public
 */
router.get('/', AuthGuard, (req: express.Request, res: express.Response) => {
  res.send('Auth api');
});

export { router };