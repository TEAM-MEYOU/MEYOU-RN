import { useQuery } from 'react-query';
import { checkMember, Member } from '@apis/member';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const useUser = () => {
  const [kakao, setKakao] = useState('');
  const user = useQuery<Member>('user', () => checkMember(kakao), {
    enabled: kakao !== '',
  });

  const getKakao = async () => {
    const data = await AsyncStorage.getItem('kakao');
    if (data) setKakao(data);
  };

  useEffect(() => {
    getKakao();
  }, []);

  return user;
};

export default useUser;
