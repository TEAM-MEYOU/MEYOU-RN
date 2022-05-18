import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiaryLogScreen from '@screens/DiaryLogScreen';
import ChartScreen from '@screens/ChartScreen';

export type ChartStackNavigation = {
  Chart: undefined;
  DiaryLog: undefined;
  Emotion: undefined;
  Frequency: undefined;
  Long: undefined;
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
    </ChatStack.Navigator>
  );
}

export default ChartNavigation;
