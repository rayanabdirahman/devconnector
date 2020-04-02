import express from 'express';
import { RegistrableController } from "../registrable.controller";
import { injectable } from "inversify";
import ApiResponse from '../../util/api-response';
import AuthGuard from '../../middleware/authguard';
import { ExtendedRequest } from '../../custom';
import { JwtUserPayload } from '../../domain/interfaces';

@injectable()
export default class ProfileController implements RegistrableController {
  registerRoutes(app: express.Application): void {
    app.get('/api/profile/me', AuthGuard, this.getProfile);
  }

  /**
   * @get current users profile
   * @private
   */
  private getProfile = async (req: ExtendedRequest, res: express.Response): Promise<express.Response> => {
    try {

      const user: JwtUserPayload = {
        ...req.user
      }

      // return profile for current user
      // const token = await this.profileService.createUser(model);

      return ApiResponse.success(res, { user });

    } catch (error) {
      const { message } = error;
      return ApiResponse.error(res, message);
    }
  }
}