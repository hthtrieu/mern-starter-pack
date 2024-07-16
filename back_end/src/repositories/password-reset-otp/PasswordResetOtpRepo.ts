import { PasswordResetOtps } from '@entity/PasswordResetOtps';
import { User } from '@entity/User';
import { Service } from 'typedi';
import { AppDataSource } from '@src/data-source';
import { genOTP } from '@src/helper/GenerateOTP';

import { IPasswordResetOtpRepo } from './IPasswordResetOtpRepo';

@Service()
export class PasswordResetOtpRepo implements IPasswordResetOtpRepo {
  private otpDataSource = AppDataSource.getRepository(PasswordResetOtps);
  private userDataSource = AppDataSource.getRepository(User);

  createOTP = async (email: string): Promise<PasswordResetOtps | null> => {
    const updateUser = await this.userDataSource.findOne({
      where: {
        email: email,
      },
      relations: {
        passwordResetOtps: true,
      },
    });
    const gen_otp = genOTP();
    if (updateUser) {
      if (updateUser.passwordResetOtps) {
        updateUser.passwordResetOtps.otp = String(gen_otp);
        updateUser.passwordResetOtps.updated_at = new Date();
        const result = await this.otpDataSource.save(
          updateUser.passwordResetOtps,
        );
        await this.userDataSource.save(updateUser);
        return result;
      } else {
        const otp = new PasswordResetOtps();
        otp.otp = String(gen_otp);
        updateUser.passwordResetOtps = otp;
        updateUser.passwordResetOtps.created_at = new Date();
        const result = await this.otpDataSource.save(otp);
        await this.userDataSource.save(updateUser);
        return result;
      }
    }
    return this.getPasswordResetOtp(email);
  };

  getPasswordResetOtp = async (
    email: string,
  ): Promise<PasswordResetOtps | null> => {
    const user = await this.userDataSource.findOne({
      where: {
        email: email,
      },
      relations: {
        passwordResetOtps: true,
      },
    });
    if (user) {
      return user.passwordResetOtps;
    }
    return null;
  };
}
