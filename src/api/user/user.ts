import { GravatorEnum } from './../../domain/enums';
import { SignUpModel } from './../../domain/interfaces';
import User from '../../data_access/models/user.model';
import { AccountValidator } from './user.validation';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import express from 'express';

const router: express.Router = express.Router();

/**
 * @post api/users
 * @description Test route
 * @public
 */
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const signUpModel: SignUpModel = {
      ...req.body
    };
  
    const validity = AccountValidator.signUp(signUpModel);
    if (validity.error) {
      const { message } = validity.error;
      return res.status(400).json({error: message});
    }
  
    // check if user exists
    await registerUser(signUpModel);

    res.status(200).send('User registered');
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
});

const registerUser = async (user: SignUpModel) => {
  const { name, email, password, avatar } = user;

  try {
    let user = await User.findOne({ email }); // check if user exists
    if (user) {
      throw new Error('Unable to register user: this email is already taken');
    }

    // set user avatar
    const avatar = gravatar.url(email, {
      s: GravatorEnum.s,
      r: GravatorEnum.r,
      d: GravatorEnum.d
    });
    
    // create new user instance
    user = new User({
      name,
      email,
      password,
      avatar
    })

    // encrypt user password using bycrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // save user to DB
    await user.save();
  }
  catch(error) {
    console.error(`registerUser >>>> Unable to register user: ${error.message}`);
    throw new Error(`${error.message}`);
  }
}

export { router };