import { jwtHelper } from './../../helpers/jwt-helper';
import { UserService } from '../../services/user.service';
import { SignUpModel, UserModel } from './../../domain/interfaces';
import { UserValidator } from './user.validation';
import express from 'express';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Registers user in the databse and returns JWT token
   * @returns { object }
   */
  registerUser = async (req: express.Request, res: express.Response) => {
    try {
      const signUpModel: SignUpModel = {
        ...req.body
      };
    
      const validity = UserValidator.signUp(signUpModel);
      if (validity.error) {
        const { message } = validity.error;
        return res.status(400).json({error: message});
      }
    
      // register user
      const user: UserModel = await this.userService.signUp(signUpModel);

      // sign JWT token with user model;
      const token: string = await jwtHelper.signJWTToken(user);

      // return users JWT
      return res.status(200).json({ token });
    }
    catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
















// const router: express.Router = express.Router();
// const accountService: AccountService = new AccountService();

// const registerUser = async (req: express.Request, res: express.Response) => {
//   try {
//     const signUpModel: SignUpModel = {
//       ...req.body
//     };
  
//     const validity = AccountValidator.signUp(signUpModel);
//     if (validity.error) {
//       const { message } = validity.error;
//       return res.status(400).json({error: message});
//     }
  
//     // register user
//     const user: UserModel = await accountService.signUp(signUpModel);

//     // sign JWT token with user model;
//     const token: string = await accountService.getJWTToken(user);

//     // return users JWT
//     return res.status(200).json({ token });
//   }
//   catch (error) {
//     return res.status(400).json({ error: error.message })
//   }
// }

// /**
//  * @post api/users
//  * @description Test route
//  * @public
//  */
// router.post('/', registerUser);


// export { router };