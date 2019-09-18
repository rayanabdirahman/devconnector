import * as Joi from '@hapi/joi';
import { ProfileModel } from '../../domain/interfaces';

export class ProfileValidator {
  private static createProfileSchema: Joi.ObjectSchema = Joi.object({
    skills: Joi.string().required(),
    company: Joi.string(),
    website: Joi.string(),
    location: Joi.string(),
    bio: Joi.string(),
    status: Joi.string().required(),
    githubUserName: Joi.string(),
    youtube: Joi.string(),
    twitter: Joi.string(),
    facebook: Joi.string(),
    linkedIn: Joi.string(),
    instagram: Joi.string(),
  });

  public static createProfile(profileModal: ProfileModel): Joi.ValidationResult<any> {
    return Joi.validate(profileModal, this.createProfileSchema);
  }
}