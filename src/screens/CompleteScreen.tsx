import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import Layout from '@components/Layout';
import Container from '@components/Container';
import Lottie from '@components/Lottie';
import { css } from '@emotion/native';
import IconText from '@components/IconText';
import { useFetchCoinLog, useFetchDiaryByDate, useFetchUser } from '@hooks/queries';
import { ToJavaLocaleDate } from '@utils/date';
import { EmotionValue } from '@apis/diary';

function CompleteScreen() {
  const today = ToJavaLocaleDate(new Date());
  const fetchUser = useFetchUser();
  const fetchDiary = useFetchDiaryByDate(fetchUser.data!.id!, today);
  const fetchCoinLog = useFetchCoinLog(fetchUser.data!.coupleId!, today, today);
  const [coinCount, setCoinCount] = useState(0);

  const getEmotionPath = (emotion: EmotionValue) => {
    switch (emotion) {
      case 'LOVE':
        return require('/assets/icons/emotions/LOVE.png');
      case 'ANGRY':
        return require('/assets/icons/emotions/ANGRY.png');
      case 'SAD':
        return require('/assets/icons/emotions/SAD.png');
      case 'HAPPY':
        return require('/assets/icons/emotions/HAPPY.png');
      case 'NEUTRAL':
        return require('/assets/icons/emotions/NEUTRAL.png');
      case 'DEPRESSED':
        return require('/assets/icons/emotions/DEPRESSED.png');
    }
  };

  useEffect(() => {
    if (fetchCoinLog.data) {
      let count = 0;
      fetchCoinLog.data.map(log => {
        if (log.coinLogType === 'GAIN') {
          count += 1;
        }
      });
      setCoinCount(count);
    }
  }, [fetchCoinLog.data]);
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <Layout>
        {fetchDiary.data && fetchCoinLog.data && (
          <>
            <Container
              style={css`
                flex: 1;
                align-items: center;
                justify-content: center;
              `}>
              <Lottie
                style={css`
                  height: 250px;
                `}
                autoPlay={true}
                loop={true}
                uri={'https://assets3.lottiefiles.com/packages/lf20_wcnjmdp1.json'}
              />
              <Text
                style={css`
                  font-weight: 600;
                  font-size: 17px;
                  letter-spacing: -0.5px;
                `}>
                오늘은 이미 다이어리를 작성하셨네요 !
              </Text>
            </Container>
            <IconText uri={getEmotionPath(fetchDiary.data?.userEmotion)}>오늘 나의 감정</IconText>
            <IconText uri={getEmotionPath(fetchDiary.data?.predEmotion)}>미유가 추측한 감정</IconText>
            <IconText uri={require('/assets/icons/coin.png')}>오늘 얻은 코인 +{coinCount}</IconText>
          </>
        )}
      </Layout>
    </SafeAreaView>
  );
}

export default CompleteScreen;
