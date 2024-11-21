import { Request, Response } from 'express';
import Container, { Inject, Service } from 'typedi';

import { JwtPayloadType } from '../../../common/types/JwtPayloadType';
import {
  ApiResponse,
  FailureMsgResponse,
  SuccessResponse,
} from '../../../common/utils/ApiResponse';
import { StorageServiceImplement } from '../../../services/storage/storage.service';
import { StorageServiceInterface } from '../../../services/storage/storage.service.interface';

@Service()
export class StorageController {
  @Inject(() => StorageServiceImplement)
  private storageService!: StorageServiceInterface;
  // private storageService: StorageServiceInterface;
  // constructor() {
  //   this.storageService = Container.get(StorageServiceImplement);
  // }

  uploadFile = async (req: Request, res: Response): Promise<Response> => {
    const url = await this.storageService.uploadFile(req.file);
    return new SuccessResponse('Upload success', { url }).send(res);
  };

  getPresignedUrl = async (req: Request, res: Response): Promise<Response> => {
    const url = await this.storageService.generatePresignedUrl({
      name: req.body.name,
      fileType: req.body?.fileType,
    });
    return new SuccessResponse('Upload success', { url }).send(res);
  };
}
