import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';
import { checkMember, Member } from '@apis/member';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { Couple, getCouple } from '@apis/couple';
import { CoupleDiary, Diary, getCoupleDiary, getDiaryByDate, getDiaryById, Page } from '@apis/diary';
import { CoinLog, getCoinLog } from '@apis/coin';

export const useFetchUser = (options?: UseQueryOptions<Member, AxiosError, Member, 'user'>) => {
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

export const useFetchCouple = (
  coupleId: number | undefined,
  options?: UseQueryOptions<Couple, AxiosError, Couple, 'couple'>
) => {
  const couple: UseQueryResult<Couple, AxiosError> = useQuery('couple', () => getCouple(coupleId!), {
    enabled: coupleId !== undefined,
    ...options,
  });

  return couple;
};

export const useFetchDiaryList = (
  coupleId: number | undefined,
  options?: UseInfiniteQueryOptions<Page<CoupleDiary>, AxiosError, Page<CoupleDiary>, Page<CoupleDiary>, 'diaryList'>
) => {
  const diaryList: UseInfiniteQueryResult<Page<CoupleDiary>, AxiosError> = useInfiniteQuery(
    'diaryList',
    () => getCoupleDiary(coupleId!),
    {
      enabled: coupleId !== undefined,
      ...options,
    }
  );

  return diaryList;
};

export const useFetchDiaryById = (
  id: number,
  options?: UseQueryOptions<Diary, AxiosError, Diary, ['diary', number]>
) => {
  const diary: UseQueryResult<Diary, AxiosError> = useQuery(['diary', id], () => getDiaryById(id), {
    ...options,
  });

  return diary;
};

export const useFetchDiaryByDate = (
  memberId: number,
  date: string,
  options?: UseQueryOptions<Diary, AxiosError, Diary, ['diary', string]>
) => {
  const diary: UseQueryResult<Diary, AxiosError> = useQuery(['diary', date], () => getDiaryByDate(memberId, date), {
    enabled: memberId !== undefined,
    ...options,
  });
  return diary;
};

export const useFetchCoinLog = (
  coupleId: number,
  start: string,
  end: string,
  options?: UseQueryOptions<Array<CoinLog>, AxiosError, Array<CoinLog>, ['coin', string, string]>
) => {
  const coinLog: UseQueryResult<Array<CoinLog>> = useQuery(
    ['coin', start, end],
    () => getCoinLog(coupleId, start, end),
    {
      enabled: coupleId !== undefined,
      ...options,
    }
  );
  return coinLog;
};
