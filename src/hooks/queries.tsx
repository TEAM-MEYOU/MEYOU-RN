import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { checkMember, Member } from '@apis/member';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

const useUser = (options?: UseQueryOptions<Member, AxiosError, Member, 'user'>) => {
  const [kakao, setKakao] = useState('');
  const user: UseQueryResult<Member, AxiosError> = useQuery('user', () => checkMember(kakao), {
    enabled: kakao !== '',
    ...options,
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
