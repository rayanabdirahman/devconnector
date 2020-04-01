import express from 'express';
import { injectable } from "inversify";
import { RegistrableController } from "../registrable.controller";

@injectable()
export default class UserController implements RegistrableController {
  registerRoutes(app: express.Application): void {
    app.get('/api/user', this.getUsers);
  }

  private getUsers = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    return res.send({ "GET": "USERS" });
  }
}
