import { LoginModel } from './../../domain/interfaces';
import * as Joi from '@hapi/joi';

export class AuthValidator {
  private static loginSchema: Joi.ObjectSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  public static login (loginModel: LoginModel): Joi.ValidationResult<any> {
    return Joi.validate(loginModel, this.loginSchema);
  }
}