import axios from 'axios';

const API_URL = `https://meyoudiary.com:8080/diary`;

const Emotion = {
  Love: 'LOVE',
  Angry: 'ANGRY',
  Sad: 'SAD',
  Smile: 'HAPPY',
  Neutral: 'NEUTRAL',
  Depressed: 'DEPRESSED',
} as const;

export type EmotionValue = typeof Emotion[keyof typeof Emotion];

export interface Diary {
  id: number;
  memberId: number;
  content: string;
  predEmotion: EmotionValue;
  userEmotion: EmotionValue;
  writeTime: Date;
}

export type WriteDiary = Omit<Diary, 'id' | 'writeTime'>;

export interface Page<T> {
  content: Array<T>;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: object;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}

export interface CoupleDiary {
  id: number;
  coupleId: number;
  diary1: number;
  diary2: number | null;
  writeTime: string;
}

/**
 * 다이어리 작성 API
 * @param diary
 */
export const writeDiary = async (diary: WriteDiary) => {
  const response = await axios.post(API_URL, diary);
  return response.data;
};

/**
 * 커플 다이어리 조회 API
 * @param coupleId
 */
export const getCoupleDiary = async (coupleId: number) => {
  const response = await axios.get(`${API_URL}/couple?coupleId=${coupleId}`);
  return response.data;
};

/**
 * 해당 날짜 다이어리 조회 API
 * @param memberId
 * @param date
 */
export const getDiaryByDate = async (memberId: number, date: string) => {
  const response = await axios.get(`${API_URL}/my?memberId=${memberId}&writeTime=${date}`);
  return response.data;
};

/**
 * 해당 ID 다이어리 조회 API
 * @param id
 */
export const getDiaryById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

/**
 * start ~ end 기간의 커플다이어리 조회하는 API
 * @param coupleId
 * @param start
 * @param end
 */
export const getCoupleDiaryByDuration = async (coupleId: number, start: string, end: string) => {
  const response = await axios.get(`${API_URL}/duration?coupleId=${coupleId}&start=${start}&end=${end}`);
  return response.data;
};
