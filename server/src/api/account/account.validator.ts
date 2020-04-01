import * as Joi from '@hapi/joi';
import { LoginModel } from "../../domain/interfaces";

export default class AccountValidator {
  public static login(model: LoginModel): Joi.ValidationResult {
    return this.loginSchema.validate(model);
  }

  private static loginSchema: Joi.ObjectSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  });
}