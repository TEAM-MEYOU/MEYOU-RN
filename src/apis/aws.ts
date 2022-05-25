import axios from 'axios';

const API_URL = `https://meyoudiary.com:8080/aws/get-key-method`;

export interface AWS {
  accessKeyId: string;
  secretAccessKey: string;
}

export const getAWS = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
