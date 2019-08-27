import { SignUpModel } from './../../domain/interfaces';
import { AccountValidator } from './user.validation';
import express from 'express';

const router: express.Router = express.Router();

/**
 * @post api/users
 * @description Test route
 * @public
 */
router.post('/', (req: express.Request, res: express.Response) => {
  const signUpModel: SignUpModel = {
    ...req.body
  };

  const validity = AccountValidator.signUp(signUpModel);
  if (validity.error) {
    const { message } = validity.error;
    return res.status(400).json({error: message});
  }

  res.send('User api');
});

export { router };