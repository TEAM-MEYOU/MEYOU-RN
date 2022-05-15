import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiaryScreen from '@screens/DiaryScreen';
import CompleteScreen from '@screens/CompleteScreen';

export type DiaryStackNavigator = {
  Diary: undefined;
  Complete: undefined;
};
const DiaryStack = createNativeStackNavigator<DiaryStackNavigator>();

function DiaryNavigation() {
  return (
    <DiaryStack.Navigator screenOptions={{ headerShown: false }}>
      <DiaryStack.Screen name={'Diary'} component={DiaryScreen} />
      <DiaryStack.Screen name={'Complete'} component={CompleteScreen} />
    </DiaryStack.Navigator>
  );
}

export default DiaryNavigation;
