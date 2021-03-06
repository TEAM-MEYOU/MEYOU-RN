import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiaryLogScreen from '@screens/DiaryLogScreen';
import ChartScreen from '@screens/ChartScreen';
import EmotionScreen from '@screens/EmotionScreen';
import FrequencyScreen from '@screens/FrequencyScreen';
import LengthScreen from '@screens/LengthScreen';
import CoinScreen from '@screens/CoinScreen';

export type ChartStackNavigation = {
  Chart: undefined;
  DiaryLog: undefined;
  Emotion: undefined;
  Frequency: undefined;
  Length: undefined;
  Coin: undefined;
};

const ChatStack = createNativeStackNavigator<ChartStackNavigation>();

function ChartNavigation() {
  return (
    <ChatStack.Navigator
      initialRouteName={'Chart'}
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        contentStyle: { backgroundColor: 'white' },
      }}>
      <ChatStack.Screen name={'Chart'} component={ChartScreen} options={{ headerShown: false }} />
      <ChatStack.Screen name={'DiaryLog'} component={DiaryLogScreen} options={{ headerTitle: '다이어리 기록' }} />
      <ChatStack.Screen name={'Emotion'} component={EmotionScreen} options={{ headerTitle: '달별 감정통계' }} />
      <ChatStack.Screen
        name={'Frequency'}
        component={FrequencyScreen}
        options={{ headerTitle: '달별 다이어리 빈도' }}
      />
      <ChatStack.Screen name={'Length'} component={LengthScreen} options={{ headerTitle: '달별 다이어리 평균길이' }} />
      <ChatStack.Screen name={'Coin'} component={CoinScreen} options={{ headerTitle: '코인 사용기록' }} />
    </ChatStack.Navigator>
  );
}

export default ChartNavigation;
