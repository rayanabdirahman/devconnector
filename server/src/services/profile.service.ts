import { injectable, inject } from "inversify";
import { ProfileRepository, ProfileRepositoryImpl } from "../data_access/repositories/profile.repository";
import TYPES from "../types";
import logger from "../util/logger";
import { CreateProfileModel } from "../domain/interfaces";
import { ProfileModel } from "../data_access/interfaces";

export interface ProfileService {
  createProfile(model: CreateProfileModel): Promise<ProfileModel>
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

  async createProfile(model: CreateProfileModel): Promise<ProfileModel> {
    try {
      // convert skills string to array
      if (typeof model.skills === 'string') {
        const skills = model.skills.split(',').map(skill => skill.trim());
        model = {
          ...model,
          skills
        }
      }

      return await this.profileRepository.create(model);

    } catch(error) {
      logger.error(`[ProfileService]: Unabled to create profile for this user: ${error}`)
      throw error;
    }

  }

  async getCurrentUserProfile(_id: string): Promise<any> {
    try {
      const profile = this.profileRepository.findOneByUserId(_id);
      if (!!profile) {
        throw new Error('There is no profile for this user');
      }

      return profile

    } catch(error) {
      logger.error(`[ProfileService]: Unabled to find profile for this user: ${error}`)
      throw error;
    }

  }
}