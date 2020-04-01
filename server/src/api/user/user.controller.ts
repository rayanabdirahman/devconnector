import express from 'express';
import { injectable } from "inversify";
import { RegistrableController } from "../registrable.controller";
import { SignUpModel } from '../../domain/interfaces';
import UserValidator from './user.validator';

@injectable()
export default class UserController implements RegistrableController {
  registerRoutes(app: express.Application): void {
    app.post('/api/user', this.createUser);
    app.get('/api/user', this.getUsers);
  }

  async createUser(req: express.Request, res: express.Response): Promise<express.Response> {
    try {

      const model: SignUpModel = {
        ...req.body
      }

      // validate request body
      const validity = UserValidator.signUp(model);
      if (validity.error) {
        const { message } = validity.error;
        return res.status(400).send(message);
      }

      return res.send(model)

    } catch (error) {

      return error
    }
  }

  private getUsers = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    return res.send({ "GET": "USERS" });
  }
}
