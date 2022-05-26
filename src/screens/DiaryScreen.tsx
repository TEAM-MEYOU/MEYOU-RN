import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Layout from '@components/Layout';
import Container from '@components/Container';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { css } from '@emotion/native';
import BottomCTA from '@components/BottomCTA';
import colors from '@constants/colors';
import { EmotionValue, WriteDiary, writeDiary } from '@apis/diary';
import { useFetchUser } from '@hooks/queries';
import { useQueryClient } from 'react-query';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DiaryStackNavigator } from '@navigation/DiaryNavigation';
import KeyboardHide from '@components/KeyboardHide';

function DiaryScreen({ navigation }: NativeStackScreenProps<DiaryStackNavigator>) {
  const fetchUser = useFetchUser();
  const queryClient = useQueryClient();
  const date = new Date();
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState<EmotionValue>('LOVE');

  const onInvalidateQueries = async () => {
    await queryClient.invalidateQueries();
  };

  const handlePressWrite = async () => {
    if (fetchUser.data && content.trim().length) {
      try {
        const diary: WriteDiary = {
          memberId: fetchUser.data.id,
          content: content,
          userEmotion: emotion,
          predEmotion: emotion,
        };
        await writeDiary(diary);
        await onInvalidateQueries();
        navigation.navigate('Complete');
      } catch (e) {
        console.log(e);
      }
    } else {
      Alert.alert('다이어리 내용을 작성해주세요!');
    }
  };
  const handlePressEmotionAI = () => {
    Alert.alert('준비중입니다');
    // todo
  };
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <KeyboardHide>
        <Layout>
          <Container
            style={css`
              flex: 1;
            `}>
            <Text
              style={css`
                font-weight: 600;
                font-size: 18px;
              `}>
              {date.getMonth() + 1}월 {date.getDate()}일 다이어리
            </Text>
            <TextInput
              style={css`
                flex: 1;
                font-weight: 500;
                font-size: 16px;
              `}
              multiline={true}
              textAlignVertical={'top'}
              placeholder={'오늘의 다이어리를 작성해보세요!'}
              value={content}
              onChangeText={setContent}
            />
            <View
              style={css`
                flex-direction: row;
                align-items: center;
                margin-top: 10px;
                margin-left: auto;
              `}>
              <Image style={{ width: 35, height: 35, marginRight: 5 }} source={require('/assets/icons/coin.png')} />
              <Text
                style={css`
                  font-weight: 600;
                  font-size: 18px;
                  letter-spacing: -0.5px;
                `}>
                +1
              </Text>
            </View>
          </Container>
          <Container
            style={css`
              margin: 10px 0;
            `}>
            <Text
              style={css`
                font-weight: 600;
                font-size: 18px;
              `}>
              오늘 나의 감정
            </Text>
            <Text
              style={css`
                letter-spacing: -0.5px;
                font-weight: 500;
                color: ${colors.content300};
              `}>
              더 좋은 서비스를위해 MeYou에 감정이 제공됩니다.
            </Text>
            <View
              style={css`
                flex-direction: row;
                justify-content: space-between;
                flex-wrap: wrap;
              `}>
              <EmotionSelectBox emotion={emotion} type={'LOVE'} setEmotion={setEmotion} />
              <EmotionSelectBox emotion={emotion} type={'HAPPY'} setEmotion={setEmotion} />
              <EmotionSelectBox emotion={emotion} type={'NEUTRAL'} setEmotion={setEmotion} />
              <EmotionSelectBox emotion={emotion} type={'DEPRESSED'} setEmotion={setEmotion} />
              <EmotionSelectBox emotion={emotion} type={'SAD'} setEmotion={setEmotion} />
              <EmotionSelectBox emotion={emotion} type={'ANGRY'} setEmotion={setEmotion} />
            </View>
            <Text
              style={css`
                margin: 30px 0 10px;
                font-weight: 600;
                font-size: 18px;
              `}>
              MeYou가 추측한 감정
            </Text>
            <BottomCTA onPress={handlePressEmotionAI}>분석하기</BottomCTA>
          </Container>
          <BottomCTA onPress={handlePressWrite}>완료</BottomCTA>
        </Layout>
      </KeyboardHide>
    </SafeAreaView>
  );
}

export default DiaryScreen;

interface EmotionSelectBoxProps {
  emotion: EmotionValue;
  setEmotion: Dispatch<SetStateAction<EmotionValue>>;
  type: EmotionValue;
}

const EmotionSelectBox = ({ emotion, type, setEmotion }: EmotionSelectBoxProps) => {
  const getEmotionPath = useCallback(() => {
    switch (type) {
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
  }, [type]);
  return (
    <TouchableOpacity
      onPress={() => setEmotion(type)}
      style={css`
        width: 50px;
        height: 50px;
        border-radius: 12px;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
        background-color: ${emotion === type ? colors.content200 : colors.content100};
      `}>
      <Image style={{ width: 30, height: 30 }} source={getEmotionPath()} />
    </TouchableOpacity>
  );
};
