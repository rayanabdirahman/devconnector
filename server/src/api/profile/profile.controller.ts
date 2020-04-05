import express from 'express';
import { RegistrableController } from "../registrable.controller";
import { injectable, inject } from "inversify";
import ApiResponse from '../../util/api-response';
import AuthGuard from '../../middleware/authguard';
import { ExtendedRequest } from '../../custom';
import { JwtUserPayload, CreateProfileModel } from '../../domain/interfaces';
import { ProfileService } from '../../services/profile.service';
import TYPES from '../../types';
import ProfileValidator from './profile.validator';

@injectable()
export default class ProfileController implements RegistrableController {
  private profileService: ProfileService;

  constructor(
    @inject(TYPES.ProfileService) profileService: ProfileService
  ){
    this.profileService = profileService
  }

  registerRoutes(app: express.Application): void {
    app.post('/api/profile', AuthGuard, this.createProfile);
    app.get('/api/profile/me', AuthGuard, this.getCurrentUserProfile);
  }

  /**
   * @post create profile for current user
   * @private
   */
  private createProfile = async (req: ExtendedRequest, res: express.Response): Promise<express.Response> => {
    try {

      const model: CreateProfileModel = {
        ...req.body
      }

      const user: JwtUserPayload = {
        ...req.user
      }

      // validate request body
      const validity = ProfileValidator.createProfile(model);
      if (validity.error) {
        const { message } = validity.error;
        return ApiResponse.error(res, message);
      }

      const profile = await this.profileService.createProfile(model, user._id);

      return ApiResponse.success(res, { profile });

    } catch (error) {
      const { message } = error;
      return ApiResponse.error(res, message);
    }
  }

  /**
   * @get current users profile
   * @private
   */
  private getCurrentUserProfile = async (req: ExtendedRequest, res: express.Response): Promise<express.Response> => {
    try {

      const user: JwtUserPayload = {
        ...req.user
      }

      // return profile for current user
      const profile = await this.profileService.getCurrentUserProfile(user._id);

      return ApiResponse.success(res, { profile });

    } catch (error) {
      const { message } = error;
      return ApiResponse.error(res, message);
    }
  }
}