import bcrypt  from 'bcryptjs';
import { AuthValidator } from './auth.validator';
import { LoginModel} from './../../domain/interfaces';
import express from 'express';
import { AuthService } from '../../services/auth.service';
import { ErrorMessage } from '../../domain/enums';
import { jwtHelper } from '../../helpers/jwt-helper';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  authoriseUser = async (req: express.Request, res: express.Response) => {
    try {
      const { id: userId } = req.user;

      const user = await this.authService.findUserById(userId);

      res.json(user);
    }
    catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  
  login = async (req: express.Request, res: express.Response) => {
    try {
      const loginModel: LoginModel = {
        ...req.body
      };

      const validity = AuthValidator.login(loginModel);
      if (validity.error) {
        const { message } = validity.error;
        return res.status(400).json({ error: message })
      }

      // check if user email exists in DB
      const user = await this.authService.findOneUser(loginModel.email);
      
      if (!user) {
        return res.status(400).json({ error: ErrorMessage.INVALID_DETAILS});
      }

      // TODO - Move this logic into seprate password compare function
      // check whether password is correct
      const isMatch = await bcrypt.compare(loginModel.password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: ErrorMessage.INVALID_DETAILS});
      }

      // sign JWT token with user details;
      const token: string = await jwtHelper.signJWTToken(user);

      // return users JWT
      return res.status(200).json({ token });

    }
    catch (error) {

    }
  }
}