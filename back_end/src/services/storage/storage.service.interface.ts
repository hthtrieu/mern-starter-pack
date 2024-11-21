import { PresignedUrlDto } from '../../adapter/dtos/storage/presiged-url.dto';

export interface StorageServiceInterface {
  // uploadImage(file: Express.Multer.File | any): Promise<string>;
  uploadFile(file: Express.Multer.File | any): Promise<string>;

  generatePresignedUrl(data: PresignedUrlDto): Promise<string>;

  getUrlFile(filePath: string): Promise<string>;
}
