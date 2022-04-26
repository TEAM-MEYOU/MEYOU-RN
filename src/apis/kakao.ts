import {
  getProfile,
  KakaoOAuthToken,
  KakaoProfile,
  KakaoProfileNoneAgreement,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';

export const signInWithKakao = async () => {
  const token: KakaoOAuthToken = await login();
  return JSON.stringify(token);
};

export const signOutWithKakao = async () => {
  return await logout();
};

export const getKakaoProfile = async () => {
  const profile: KakaoProfile | KakaoProfileNoneAgreement = await getProfile();
  return profile;
};

export const unlinkKakao = async () => {
  return await unlink();
};
