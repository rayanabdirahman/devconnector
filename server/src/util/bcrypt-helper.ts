import * as bycrypt from 'bcryptjs';
import { BcryptEnum } from '../domain/enums';

interface BycryptHelper {
  encryptPassword(password: string): Promise<string>
}

const BycryptHelper: BycryptHelper = {
  async encryptPassword(password: string): Promise<string> {
    const salt = await bycrypt.genSalt(BcryptEnum.SALT_ROUND);
    return bycrypt.hash(password, salt);
  }
};

export default BycryptHelper;
