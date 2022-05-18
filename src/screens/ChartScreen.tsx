import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Layout from '@components/Layout';
import IconText from '@components/IconText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChartStackNavigation } from '@navigation/ChartNavigation';

function ChartScreen({ navigation }: NativeStackScreenProps<ChartStackNavigation>) {
  const handleNavigate = (stack: keyof ChartStackNavigation) => {
    navigation.navigate(stack);
  };
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <Layout>
        <IconText uri={require('/assets/icons/emotions/LOVE.png')} onPress={() => handleNavigate('DiaryLog')}>
          다이어리 기록보기
        </IconText>
        <IconText uri={require('/assets/icons/pie-chart.png')}>달별 감정 통계 보러가기</IconText>
        <IconText uri={require('/assets/icons/thinking.png')}>이번달 누가 더 다이어리를 많이 썼을까요?</IconText>
        <IconText uri={require('/assets/icons/thinking.png')}>누가 더 다이어리를 길게 썼을까요?</IconText>
        <IconText uri={require('/assets/icons/coin.png')}>코인을 어떻게 사용했을까요?</IconText>
      </Layout>
    </SafeAreaView>
  );
}

export default ChartScreen;
