import 'dotenv/config';

interface S3ConfigType {
  accessKey: string;
  secretKey: string;
  bucketName: string;
  bucketRegion: string;
  useSSL: boolean;
  //minio
  port: number;
  endPoint: string;
}

export const s3Config: S3ConfigType = {
  accessKey: process.env.AWS_S3_ACCESS_KEY_ID || '',
  secretKey: process.env.AWS_S3_SECRET_ACCESS_KEY || '',
  bucketName: process.env.AWS_S3_BUCKET_NAME || '',
  bucketRegion: process.env.AWS_S3_BUCKET_REGION || '',
  //minio
  endPoint: String(process.env.MINIO_ENDPOINT) || 'localhost',
  port: Number(process.env.MINIO_PORT) || 9000,
  useSSL: Boolean(process.env.useSSL) || false,
};
