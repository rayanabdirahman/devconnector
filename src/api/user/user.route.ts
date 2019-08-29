import { UserController } from './user.controller';
import express from 'express';

const router: express.Router = express.Router();
const userController: UserController = new UserController();

/**
 * @post api/users
 * @description register user
 * @public
 */
router.post('/', userController.registerUser);


export { router };