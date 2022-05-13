import React, { useCallback, useEffect, useState } from 'react';
import Container from '@components/Container';
import { Image, Text, View } from 'react-native';
import { CoupleDiary, Diary } from '@apis/diary';
import { ToDiaryDateString } from '@utils/date';
import { css } from '@emotion/native';
import UserProfileImage from '@components/UserProfileImage';
import { useFetchDiaryById, useFetchUser } from '@hooks/queries';
import colors from '@constants/colors';

interface Props {
  coupleDiary: CoupleDiary;
}

function DiaryBox({ coupleDiary }: Props) {
  const fetchUser = useFetchUser();
  const fetchDiary1 = useFetchDiaryById(coupleDiary.diary1);
  const fetchDiary2 = useFetchDiaryById(coupleDiary.diary2!, {
    enabled: coupleDiary.diary2 !== null,
  });
  const [myDiary, setMyDiary] = useState<Diary>();
  const [partnerDiary, setPartnerDiary] = useState<Diary>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (fetchUser.data && fetchDiary1.data && fetchDiary2.data !== null) {
      if (fetchDiary1.data.memberId === fetchUser.data.id || fetchDiary2.data?.memberId === fetchUser.data.id) {
        setVisible(true);
      }
    }
    if (fetchDiary1.data && fetchUser.data) {
      if (fetchUser.data.id === fetchDiary1.data.memberId) {
        setMyDiary(fetchDiary1.data);
        setPartnerDiary(fetchDiary2.data);
      } else {
        setMyDiary(fetchDiary2.data);
        setPartnerDiary(fetchDiary1.data);
      }
    }
  }, [fetchDiary1.data, fetchDiary2.data, fetchUser.data]);
  return (
    <Container
      style={css`
        margin-top: 10px;
      `}>
      <Text
        style={css`
          font-weight: 600;
          font-size: 16px;
        `}>
        {ToDiaryDateString(coupleDiary.writeTime)}
      </Text>
      <DiaryItem diary={myDiary} url={fetchUser.data?.imageUrl} />
      <DiaryItem diary={partnerDiary} url={fetchUser.data?.coupleInfo?.imageUrl} visible={visible} />
    </Container>
  );
}

export default React.memo(DiaryBox);

interface ItemProps {
  diary?: Diary;
  url?: string;
  visible?: boolean;
}

function DiaryItem({ diary, url, visible = true }: ItemProps) {
  const getEmotionPath = useCallback(() => {
    switch (diary?.userEmotion) {
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
  }, [diary]);
  return (
    <View
      style={css`
        flex-direction: row;
        align-items: center;
        margin-top: 30px;
      `}>
      <View>
        <UserProfileImage url={url} style={{ width: 45, height: 45, marginRight: 25 }} />
        {visible && diary ? (
          <Image
            style={{ position: 'absolute', bottom: -5, right: 15, width: 25, height: 25 }}
            source={getEmotionPath()}
          />
        ) : (
          <Image
            style={{ position: 'absolute', top: -15, right: 0, width: 25, height: 25 }}
            source={require('/assets/icons/ask_icon.png')}
          />
        )}
      </View>
      {visible && diary && (
        <Text
          numberOfLines={2}
          ellipsizeMode={'tail'}
          style={css`
            font-weight: 600;
            flex-shrink: 1;
            font-size: 15px;
          `}>
          {diary?.content}
        </Text>
      )}
      {visible && diary === undefined && (
        <Text
          style={css`
            font-weight: 600;
            flex-shrink: 1;
            font-size: 15px;
            color: ${colors.content200};
          `}>
          아직 다이어리를 작성하지 않았어요!
        </Text>
      )}
      {!visible && diary && (
        <Text
          style={css`
            font-weight: 600;
            flex-shrink: 1;
            font-size: 15px;
            color: ${colors.content200};
          `}>
          상대방의 다이어리를 보려면 다이어리를 작성해보세요!
        </Text>
      )}
    </View>
  );
}
