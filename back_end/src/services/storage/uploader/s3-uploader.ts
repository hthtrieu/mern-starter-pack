import fs from 'fs';
import AWS, { S3 } from 'aws-sdk';
import { Service } from 'typedi';

import 'dotenv/config';

import { PresignedUrlDto } from '../../../adapter/dtos/storage/presiged-url.dto';
import { s3Config } from '../../../config/s3.config';

const isMinIO =
  process.env.UPLOAD_DRIVER === 'minio' ||
  process.env.UPLOAD_DRIVER === 's3-presigned';

@Service()
export class s3Uploader {
  private s3 = new S3({
    endpoint: isMinIO ? `${s3Config.endPoint}:${s3Config.port}` : undefined,
    region: isMinIO ? undefined : s3Config.bucketRegion,
    accessKeyId: s3Config.accessKey,
    secretAccessKey: s3Config.secretKey,
    s3ForcePathStyle: true, // Quan trọng với MinIO
  });

  async upload(file: Express.Multer.File): Promise<string> {
    const blob = fs.readFileSync(file.path);
    const result = await this.s3
      .upload({
        Bucket: String(s3Config.bucketName),
        Body: blob,
        Key: `${file.filename}`,
        ContentType: file.mimetype,
      })
      .promise();
    return result.Location;
    1;
  }
  generatePresignedUrl = async (
    data: PresignedUrlDto,
  ): Promise<string | any | void> => {
    const params = {
      Bucket: s3Config.bucketName,
      Key: data.name,
      Expires: 60 * 5, // Pre-signed URL có thời hạn 5 phút
      ContentType: data.fileType || 'image/*',
    };
    return this.s3.getSignedUrlPromise('putObject', params);
  };

  getUrl = async (filepath: string): Promise<string> => {
    const params = {
      Bucket: s3Config.bucketName,
      Key: filepath,
      Expires: 60 * 5,
    };
    return this.s3.getSignedUrl('getObject', params);
  };
}
