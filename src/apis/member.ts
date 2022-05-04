import axios from 'axios';

const API_URL = 'https://meyoudiary.com:8080/member';

export interface Member {
  id: number;
  kakao: string;
  uniqueCode: string;
  nickname: string;
  coupleId: number;
  coupleMemberId: number;
  isActive: boolean;
  imageUrl: string;

  coupleInfo?: Member;
}

export type RegisterMember = Pick<Member, 'kakao' | 'uniqueCode'>;

/**
 * Memeber 조회 API
 * @param id
 */
export const getMember = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

/**
 * 유니크 코드로 해당하는 멤버 조회 API
 * @param uniqueCode
 */
export const getMemberByUniqueCode = async (uniqueCode: string) => {
  const response = await axios.get(`${API_URL}/unique?uniqueCode=${uniqueCode}`);
  return response.data;
};

/**
 * MEMBER가 MEYOU 회원인지 확인하는 API
 * 회원이면 MemberDto 반환
 * 아니면 404반환
 */
export const checkMember = async (kakao: string) => {
  const response = await axios.get(`${API_URL}/check?kakao=${kakao}`);
  return response.data;
};

/**
 * Member 등록 API
 * @param member
 */
export const registerMember = async (member: RegisterMember) => {
  const response = await axios.post(API_URL, member);
  return response.data;
};

/**
 * Member Update API
 * @param member
 */
export const updateMember = async (member: Partial<Member>) => {
  const response = await axios.put(API_URL, member);
  return response.data;
};

/**
 * ProfileImage Update API
 * @param id
 * @param url
 */
export const updateProfileImage = async (id: number, url: string) => {
  const response = await axios.get(`${API_URL}/profile?memberId=${id}&imageUrl=${url}`);
  return response.data;
};

/**
 * 회원 탈퇴 요청 API
 * 회원 탈퇴 -> 30일간 복구 가능
 * @param id
 */
export const disconnectMember = async (id: number) => {
  const response = await axios.get(`${API_URL}/unactive?memberId=${id}`);
  return response.data;
};
