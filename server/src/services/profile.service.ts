import { injectable, inject } from "inversify";
import { ProfileRepository, ProfileRepositoryImpl } from "../data_access/repositories/profile.repository";
import TYPES from "../types";
import logger from "../util/logger";

export interface ProfileService {
  getCurrentUserProfile(_id: string): Promise<any>
}

@injectable()
export class ProfileServiceImpl implements ProfileService {
  private profileRepository: ProfileRepository;

  constructor(
    @inject(TYPES.ProfileRepository) profileRepository: ProfileRepository
  ){
    this.profileRepository = profileRepository
  }

  async getCurrentUserProfile(_id: string): Promise<any> {
    try {
      const profile = this.profileRepository.findOneByUserId(_id);
      if (!!profile) {
        throw new Error('There is no profile for this user');
      }

      return profile

    } catch(error) {
      logger.error(`[ProfileService]: Unabled to find frofile for this user: ${error}`)
      throw error;
    }

  }
}