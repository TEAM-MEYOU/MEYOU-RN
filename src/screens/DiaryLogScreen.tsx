import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Layout from '@components/Layout';
import Calendar from '@components/Calendar';
import { useFetchDiaryByDuration, useFetchUser } from '@hooks/queries';
import { ToJavaLocaleDate } from '@utils/date';
import Diary from '@components/Diary';
import { CoupleDiary } from '@apis/diary';
import { ScrollView } from 'react-native';
import { css } from '@emotion/native';

function DiaryLogScreen() {
  const [date, setDate] = useState(() => {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    };
  });
  const fetchUser = useFetchUser();
  const fetchCoupleDiaryLog = useFetchDiaryByDuration(
    fetchUser.data!.coupleId!,
    ToJavaLocaleDate(new Date(date.year, date.month - 1, 1)),
    ToJavaLocaleDate(new Date(date.year, date.month, 1))
  );
  const [diaryDate, setDiaryDate] = useState<Array<number>>([]);
  const [coupleDiary, setCoupleDiary] = useState<CoupleDiary | null>(null);

  useEffect(() => {
    if (fetchCoupleDiaryLog.data) {
      const temp: Array<number> = [];
      fetchCoupleDiaryLog.data.map(coupleDiaryLog => temp.push(Number(coupleDiaryLog.writeTime.split('-')[2])));
      setDiaryDate(temp);
    }
  }, [fetchCoupleDiaryLog.data]);

  useEffect(() => {
    let update = false;
    if (fetchCoupleDiaryLog.data) {
      for (const item of fetchCoupleDiaryLog.data) {
        if (item.writeTime === ToJavaLocaleDate(new Date(date.year, date.month - 1, date.day))) {
          setCoupleDiary(item);
          update = true;
          break;
        }
      }
      if (!update) {
        setCoupleDiary(null);
      }
    }
  }, [date, fetchCoupleDiaryLog.data]);
  return (
    <SafeAreaView edges={['left', 'right']}>
      <Layout>
        <ScrollView
          style={css`
            width: 100%;
          `}>
          <Calendar date={date} setDate={setDate} diaryDate={diaryDate} />
          {coupleDiary && <Diary coupleDiary={coupleDiary} />}
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
}

export default DiaryLogScreen;
