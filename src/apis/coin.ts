import axios from 'axios';

const API_URL = `https://meyoudiary.com:8080/coin`;

const CoinLogType = {
  GAIN: 'GAIN',
  USE: 'USE',
} as const;

export type CoinLogValue = typeof CoinLogType[keyof typeof CoinLogType];

const CoinGainType = {
  AD: 'AD',
  DIARY_WRITE: 'DIARY_WRITE',
} as const;

export type CoinGainValue = typeof CoinGainType[keyof typeof CoinGainType];

export interface Hash {
  [key: string]: string;
}

export const CoinLogHash: Hash = {
  GAIN: '획득',
  USE: '사용',
};

export const CoinGainHash: Hash = {
  AD: '광고 시청',
  DIARY_WRITE: '다이어리 작성',
};

export interface CoinLog {
  id: number;
  coupleId: number;
  coinLogType: CoinLogValue;
  coinGainType: CoinGainValue;
  coinQuantity: number;
  createdDate: Date;
}

/**
 * 코인 획득/사용 로그 요청 API
 * start ~ day 까지 기간의 로그
 * @param coupleId
 * @param start
 * @param end
 */
export const getCoinLog = async (coupleId: number, start: string, end: string) => {
  const response = await axios.get(`${API_URL}/duration?coupleId=${coupleId}&start=${start}&end=${end}`);
  return response.data;
};
