import express from 'express';
import { injectable, inject } from "inversify";
import { RegistrableController } from "../registrable.controller";
import { SignUpModel } from '../../domain/interfaces';
import UserValidator from './user.validator';
import ApiResponse from '../../util/api-response';
import { UserService } from '../../services/user.service';
import TYPES from '../../types';

@injectable()
export default class UserController implements RegistrableController {
  private userService: UserService;

  constructor(
    @inject(TYPES.UserService) userService: UserService,
  ) {
    this.userService = userService;
  }

  registerRoutes(app: express.Application): void {
    app.post('/api/user', this.createUser);
    app.get('/api/user', this.getUsers);
  }

  private createUser = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    try {

      const model: SignUpModel = {
        ...req.body
      }

      // validate request body
      const validity = UserValidator.signUp(model);
      if (validity.error) {
        const { message } = validity.error;
        return ApiResponse.error(res, message);
      }

      // return JWT token for registered user
      const token = await this.userService.createUser(model);

      return ApiResponse.success(res, { token });

    } catch (error) {
      const { message } = error;
      return ApiResponse.error(res, message);
    }
  }

  private getUsers = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    return res.send({ "GET": "USERS" });
  }
}
