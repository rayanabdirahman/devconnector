import express from 'express';
const router: express.Router = express.Router();

/**
 * @get api/users
 * @description Test route
 * @public
 */
router.get('/', (req: express.Request, res: express.Response) => {
  res.send('User api');
});

export { router };