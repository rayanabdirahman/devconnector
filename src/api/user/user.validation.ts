import { SignUpModel } from './../../domain/interfaces';
import * as Joi from '@hapi/joi';

export class UserValidator {

  private static signUpSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  
  public static signUp (signUpModel: SignUpModel): Joi.ValidationResult<any> {
    return Joi.validate(signUpModel, this.signUpSchema);
  }
} 
