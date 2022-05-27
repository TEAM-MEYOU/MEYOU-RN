import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Layout from '@components/Layout';
import CoupleInfo from '@components/CoupleInfo';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { css } from '@emotion/native';
import { useFetchDiaryList, useFetchUser } from '@hooks/queries';
import { CoupleDiary } from '@apis/diary';
import DiaryBox from '@components/Diary';

function HomeScreen() {
  const fetchUser = useFetchUser();
  const fetchDiaryList = useFetchDiaryList(fetchUser.data?.coupleId);

  const fetchNextPage = () => {
    fetchDiaryList.hasNextPage && fetchDiaryList.fetchNextPage();
  };
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <Layout>
        <CoupleInfo />
        <FlatList
          style={css`
            width: 100%;
          `}
          data={fetchDiaryList.data?.pages
            .map(page => {
              return page.content;
            })
            .flat()}
          renderItem={({ item }: ListRenderItemInfo<CoupleDiary>) => <DiaryBox coupleDiary={item} />}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.4}
        />
      </Layout>
    </SafeAreaView>
  );
}

export default HomeScreen;
