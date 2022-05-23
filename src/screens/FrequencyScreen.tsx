import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Layout from '@components/Layout';
import { ToJavaLocaleDate } from '@utils/date';
import DateChange from '@components/DateChange';
import { useFetchStat, useFetchUser } from '@hooks/queries';
import CoupleBarChart from '@components/CoupleBarChart';
import Loading from '@components/Loading';

function FrequencyScreen() {
  const fetchUser = useFetchUser();
  const [date, setDate] = useState(() => {
    const temp = new Date();
    temp.setDate(1);
    return ToJavaLocaleDate(temp);
  });
  const fetchMemberStat = useFetchStat(fetchUser.data!.id, date);
  const fetchCoupleStat = useFetchStat(fetchUser.data!.coupleInfo!.id, date);

  return (
    <SafeAreaView edges={['left', 'right']}>
      <Layout>
        <DateChange date={date} setDate={setDate} />
        {fetchUser.data ? (
          <CoupleBarChart
            member={fetchUser.data}
            value1={fetchMemberStat.data?.diaryFreq}
            value2={fetchCoupleStat.data?.diaryFreq}
          />
        ) : (
          <Loading />
        )}
      </Layout>
    </SafeAreaView>
  );
}

export default FrequencyScreen;
