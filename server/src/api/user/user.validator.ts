import * as Joi from '@hapi/joi';
import { SignUpModel } from '../../domain/interfaces';

export default class UserValidator {
  public static signUp(model: SignUpModel): Joi.ValidationResult {
    return this.signUpSchema.validate(model);
  }

  private static signUpSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  });
}