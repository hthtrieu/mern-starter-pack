import { Axios } from 'axios';

import { AxiosConfig } from './AxiosConfig';

const BASE_URL = import.meta.env.VITE_API_URL + '/api/storage';

interface GetPresignedUrl {
  name: string;
  fileType?: string;
}
export const getPresignedUrlApi = async (data: GetPresignedUrl) => {
  const response = await AxiosConfig.post(`${BASE_URL}/get-signed-url`, data);
  return response;
};
