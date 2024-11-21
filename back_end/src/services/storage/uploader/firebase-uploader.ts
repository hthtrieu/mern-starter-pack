import 'dotenv/config';

import fs from 'fs';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { Service } from 'typedi';

import { firebaseConfig } from '../../../config/firebase.config';

const isMinIO =
  process.env.UPLOAD_DRIVER === 'minio' ||
  process.env.UPLOAD_DRIVER === 's3-presigned';

@Service()
export class firebaseUploader {
  private firebase = initializeApp({
    apiKey: firebaseConfig.firebaseKey,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.senderId,
    appId: firebaseConfig.appId,
    measurementId: firebaseConfig.meansureId,
  });
  private storage = getStorage(this.firebase);

  async upload(file: Express.Multer.File): Promise<string> {
    const storageRef = ref(this.storage, `images/${file.originalname}`);
    const buffer = fs.readFileSync(file.path);
    const metadata = {
      contentType: file.mimetype,
    };
    const snapshot = await uploadBytesResumable(storageRef, buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }
}
