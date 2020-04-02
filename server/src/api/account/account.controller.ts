import express from 'express';
import { inject, injectable } from 'inversify';
import { RegistrableController } from '../registrable.controller';
import { ExtendedRequest } from '../../custom';
import TYPES from '../../types';
import ApiResponse from '../../util/api-response';
import AuthGuard from '../../middleware/authguard';
import { LoginModel } from '../../domain/interfaces';
import AccountValidator from './account.validator';
import { AccountService } from '../../services/account.service';

@injectable()
export default class AccountController implements RegistrableController {
  private accountService: AccountService;

  constructor(
    @inject(TYPES.AccountService) accountService: AccountService,
  ) {
    this.accountService = accountService;
  }

  registerRoutes(app: express.Application): void {
    app.get('/api/account/authenticate', AuthGuard, this.authenticate);
    app.post('/api/account/login', this.login);
  }

  private authenticate = async (req: ExtendedRequest, res: express.Response): Promise<express.Response> => {
    try {

      const model = {
        ...req.user
      };

      // return authenticated user
      const user = await this.accountService.authenticateUser(model._id);

      return ApiResponse.success(res, { user });

    } catch (error) {
      const { message } = error;
      return ApiResponse.error(res, message);
    }
  }

  private login = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    try {

      const model: LoginModel = {
        ...req.body
      }

      // validate request body
      const validity = AccountValidator.login(model);
      if (validity.error) {
        const { message } = validity.error;
        return ApiResponse.error(res, message);
      }

      // return JWT token for logged in user
      const token = await this.accountService.login(model);

      return ApiResponse.success(res, { token });

    } catch (error) {
      const { message } = error;
      return ApiResponse.error(res, message);
    }
  }
}