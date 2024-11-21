import { Inject, Service } from 'typedi';

import { PresignedUrlDto } from '../../adapter/dtos/storage/presiged-url.dto';
import { StorageServiceInterface } from './storage.service.interface';
import { s3Uploader } from './uploader/s3-uploader';

@Service()
export class StorageServiceImplement implements StorageServiceInterface {
  @Inject(() => s3Uploader)
  private uploader!: s3Uploader;

  uploadFile = async (file: Express.Multer.File): Promise<string> => {
    if (
      process.env.UPLOAD_DRIVER === 's3' ||
      process.env.UPLOAD_DRIVER === 'minio'
    ) {
      const fileUrl = await this.uploader.upload(file);
      return fileUrl;
    }
    throw new Error('Invalid UPLOAD_DRIVER configuration');
  };

  generatePresignedUrl = async (data: PresignedUrlDto): Promise<string> => {
    if (process.env.UPLOAD_DRIVER === 's3-presigned') {
      const presignedUrl = await this.uploader.generatePresignedUrl(data);

      return presignedUrl;
    }
    throw new Error('Invalid UPLOAD_DRIVER configuration');
  };

  getUrlFile = async (filePath: string): Promise<string> => {
    if (process.env.UPLOAD_DRIVER === 's3-presigned') {
      const imageUrl = await this.uploader.getUrl(filePath);

      return imageUrl;
    }
    throw new Error('Invalid UPLOAD_DRIVER configuration');
  };
}
