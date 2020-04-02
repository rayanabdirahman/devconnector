import * as Joi from '@hapi/joi';
import { CreateProfileModel } from '../../domain/interfaces';

let experienceSchema: Joi.ObjectSchema = Joi.object({
  title: Joi.string().required(),
  company: Joi.string().required(),
  location: Joi.string(),
  from: Joi.date().required(),
  to: Joi.date(),
  current: Joi.boolean(),
  description: Joi.string(),
});

let educationSchema: Joi.ObjectSchema = Joi.object({
  school: Joi.string().required(),
  degree: Joi.string().required(),
  fieldofstudy: Joi.string().required(),
  from: Joi.date().required(),
  to: Joi.date(),
  current: Joi.boolean(),
  description: Joi.string(),
});

let socialSchema: Joi.ObjectSchema = Joi.object({
  youtube: Joi.string(),
  twitter: Joi.string(),
  facebook: Joi.string(),
  linkedin: Joi.string(),
  instagram: Joi.string(),
});

export default class ProfileValidator {
  public static createProfile(model: CreateProfileModel): Joi.ValidationResult {
    return this.createProfileSchema.validate(model);
  }

  private static createProfileSchema: Joi.ObjectSchema = Joi.object({
    company: Joi.string(),
    website: Joi.string(),
    location: Joi.string(),
    status: Joi.string().required(),
    skills: Joi.string().required(),
    bio: Joi.string(),
    githubusername: Joi.string(),
    experience: Joi.array().items(experienceSchema).required(),
    education: Joi.array().items(educationSchema).required(),
    social: socialSchema,
  });
}