import axios from 'axios';

const API_URL = 'https://meyoudiary.com:8080/couple';

export interface Couple {
  id: number;
  member1: string;
  member2: string;
  coupleStart: Date;
  isActive: boolean;
  coin: number;
}

/**
 * 커플 데이터 요청 API
 * @param id
 */
export const getCouple = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

/**
 * 인증코드 생성
 * @param uniqueCode
 * @param coupleUniqueCode
 */
export const makeAuthCode = async (uniqueCode: string, coupleUniqueCode: string) => {
  const response = await axios.get(`${API_URL}/code?uniqueCode=${uniqueCode}&coupleUniqueCode=${coupleUniqueCode}`);
  return response.data;
};

/**
 * 인증코드 체크
 * @param uniqueCode
 * @param authCode
 */
export const checkAuthCode = async (uniqueCode: string, authCode: string) => {
  const response = await axios.get(`${API_URL}/check?uniqueCode=${uniqueCode}&authCode=${authCode}`);
  return response.data;
};

/**
 * 커플 유니크코드로 연결 API
 * @param uniqueCode
 * @param coupleUniqueCode
 */
export const connectCouple = async (uniqueCode: string, coupleUniqueCode: string) => {
  const response = await axios.post(`${API_URL}?uniqueCode=${uniqueCode}&coupleUniqueCode=${coupleUniqueCode}`);
  return response.data;
};

/**
 * Couple Update
 * @param couple
 */
export const updateCouple = async (couple: Couple) => {
  const response = await axios.put(API_URL, couple);
  return response.data;
};

/**
 * 커플연결 해제 요청 API
 * @param coupleId
 */
export const disconnectCouple = async (coupleId: number) => {
  const response = await axios.get(`${API_URL}/decouple?coupleId=${coupleId}`);
  return response.data;
};
