import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Layout from '@components/Layout';
import Container from '@components/Container';
import { Image, Text, View } from 'react-native';
import UserProfileImage from '@components/UserProfileImage';
import { Member } from '@apis/member';
import { useFetchStat, useFetchUser } from '@hooks/queries';
import { css } from '@emotion/native';
import { EmotionValue } from '@apis/diary';
import { ToJavaLocaleDate, ToStatDateString } from '@utils/date';
import { Stat } from '@apis/stat';
import colors from '@constants/colors';
import ImageButton from '@components/ImageButton';
import Loading from '@components/Loading';

function EmotionScreen() {
  const fetchUser = useFetchUser();
  const [date, setDate] = useState(() => {
    const temp = new Date();
    temp.setDate(1);
    return ToJavaLocaleDate(temp);
  });
  const fetchMemberStat = useFetchStat(fetchUser.data!.id, date);
  const fetchCoupleStat = useFetchStat(fetchUser.data!.coupleInfo!.id, date);

  const handlePressArrow = (change: number) => {
    const _date = new Date(date);
    _date.setMonth(_date.getMonth() + change);
    setDate(ToJavaLocaleDate(_date));
  };

  return (
    <SafeAreaView edges={['left', 'right']}>
      <Layout>
        {fetchMemberStat.isFetched && fetchCoupleStat.isFetched ? (
          <>
            <Container
              style={css`
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
              `}>
              <ImageButton
                style={{ width: 25, height: 25 }}
                uri={require('/assets/icons/left.png')}
                onPress={() => handlePressArrow(-1)}
              />
              <Text
                style={css`
                  font-weight: 500;
                  font-size: 16px;
                `}>
                {ToStatDateString(date)}
              </Text>
              <ImageButton
                style={{ width: 25, height: 25 }}
                uri={require('/assets/icons/right.png')}
                onPress={() => handlePressArrow(1)}
              />
            </Container>
            <EmotionStat member={fetchUser.data!} stat={fetchMemberStat.data} />
            <EmotionStat member={fetchUser.data!.coupleInfo!} stat={fetchCoupleStat.data} />
          </>
        ) : (
          <Loading />
        )}
      </Layout>
    </SafeAreaView>
  );
}

export default EmotionScreen;

interface EmotionStatProps {
  member: Member;
  stat?: Stat;
}

function EmotionStat({ member, stat }: EmotionStatProps) {
  return (
    <Container
      style={css`
        flex: 1;
        margin-top: 15px;
        align-items: center;
      `}>
      <UserProfileImage url={member.imageUrl} style={{ width: 100, height: 100 }} />
      <Text
        style={css`
          margin-top: 5px;
          font-weight: 600;
          font-size: 17px;
        `}>
        {member.nickname}
      </Text>
      <View
        style={css`
          width: 100%;
          flex: 1;
          align-items: center;
          justify-content: center;
        `}>
        {stat ? (
          <View
            style={css`
              width: 100%;
              flex-direction: row;
              justify-content: space-between;
            `}>
            <Emotion emotion={'LOVE'} value={stat.loveFreq} />
            <Emotion emotion={'HAPPY'} value={stat.happyFreq} />
            <Emotion emotion={'NEUTRAL'} value={stat.neutralFreq} />
            <Emotion emotion={'DEPRESSED'} value={stat.depressedFreq} />
            <Emotion emotion={'SAD'} value={stat.sadFreq} />
            <Emotion emotion={'ANGRY'} value={stat.angryFreq} />
          </View>
        ) : (
          <Text
            style={css`
              font-weight: 600;
              font-size: 19px;
              letter-spacing: -0.5px;
              color: ${colors.content300};
            `}>
            다이어리 작성기록이 존재하지 않습니다!
          </Text>
        )}
      </View>
    </Container>
  );
}

interface EmotionProps {
  emotion: EmotionValue;
  value: number;
}

function Emotion({ emotion, value }: EmotionProps) {
  const getEmotionPath = () => {
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
  return (
    <View
      style={css`
        width: 40px;
        border-width: 1px;
        border-color: ${colors.content200};
        border-radius: 8px;
        align-items: center;
      `}>
      <View
        style={css`
          width: 40px;
          height: 40px;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          background-color: ${colors.content200};
          align-items: center;
          justify-content: center;
        `}>
        <Image style={{ width: 25, height: 25 }} source={getEmotionPath()} />
      </View>
      <Text
        style={css`
          font-weight: 600;
        `}>
        {value}
      </Text>
    </View>
  );
}
