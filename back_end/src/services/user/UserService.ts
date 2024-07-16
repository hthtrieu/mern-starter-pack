import { Request, Response } from 'express';
import { Container, Service } from 'typedi';
import { AuthFailureError } from '@src/core/ApiError';
import {
  FailureMsgResponse,
  FailureResponse,
  InternalErrorResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from '@src/core/ApiResponse';
import { EditUserProfileRequest } from '@src/dto/user';
import { comparePassword, hasingPassword } from '@src/helper/HashingPassword';
import { FirebaseUpload } from '@services/upload/FirebaseUpload';
import { IUploadService } from '@services/upload/IUploadService';
import UserRepo from '@repositories/user/UseRepo';
import UserRepoInterface from '@repositories/user/UserRepoInterface';

import { UserServiceInterface } from './UserServiceInterface';

@Service()
export class UserService implements UserServiceInterface {
  private userRepo: UserRepoInterface;
  private uploadService: IUploadService;
  constructor() {
    this.userRepo = Container.get(UserRepo);
    this.uploadService = Container.get(FirebaseUpload);
  }

  editProfile = async (data: EditUserProfileRequest): Promise<any> => {
    if (!data.user?.email) throw new AuthFailureError('User not found.');
    let image_url = '';
    const user = await this.userRepo.getAllUserInfoBy(
      'email',
      data?.user.email,
    );
    if (!user) {
      throw new AuthFailureError('User not found.');
    }
    if (data.image) {
      image_url = await this.uploadService.uploadImage(data.image);
    }
    const updatedData = {
      ...user,
      username: data?.username ? data.username : user.username,
      avatar: image_url ? image_url : user.avatar,
      email: data?.email ? data.email : user.email,
      updated_by: user.email,
    };
    return this.userRepo.updateUserProfile(updatedData);
  };

  changePassword = async (req: any, res: Response): Promise<any> => {
    try {
      const { id, email } = req.user;
      const { currentPassword, newPassword, confirmPassword } = req.body;
      if (newPassword !== confirmPassword) {
        return new FailureMsgResponse(
          'Password and confirm password do not match.',
        ).send(res);
      }

      const user = await this.userRepo.getAllUserInfoBy('email', email);
      if (!user) {
        return new FailureMsgResponse('User not found.').send(res);
      }
      if (!comparePassword({
        inputPassword:currentPassword,
        password: user.password
      })) {
        return new FailureMsgResponse('Current password is incorrect.').send(
          res,
        );
      }
      const result = await this.userRepo.updateUserPassword(
        id,
        hasingPassword(newPassword).password,
      );
      if (!result) {
        return new InternalErrorResponse('Internal server error.').send(res);
      }
      return new SuccessMsgResponse('Changed password successfully').send(res);
    } catch (error) {
      return new InternalErrorResponse('Internal server error.').send(res);
    }
  };


}
