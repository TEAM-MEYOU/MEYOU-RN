import axios from 'axios';

const API_URL = `https://meyoudiary.com:8080/mstat`;

export interface Stat {
  id: number;
  memberId: number;
  month: number;
  diaryLength: number;
  diaryFreq: number;
  loveFreq: number;
  happyFreq: number;
  angryFreq: number;
  sadFreq: number;
  depressedFreq: number;
  neutralFreq: number;
}

/**
 * 멤버 통계 요청 API
 * @param memberId
 * @param date
 */
export const getStat = async (memberId: number, date: string) => {
  const response = await axios.get(`${API_URL}?memberId=${memberId}&date=${date}`);
  return response.data;
};
