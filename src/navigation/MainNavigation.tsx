import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
import DiaryScreen from '@screens/DiaryScreen';
import ChartScreen from '@screens/ChartScreen';
import GameScreen from '@screens/GameScreen';
import OptionScreen from '@screens/OptionScreen';

const MainTab = createBottomTabNavigator();

function MainNavigation() {
  return (
    <MainTab.Navigator initialRouteName={'Home'}>
      <MainTab.Screen name={'Home'} component={HomeScreen} />
      <MainTab.Screen name={'Diary'} component={DiaryScreen} />
      <MainTab.Screen name={'Chart'} component={ChartScreen} />
      <MainTab.Screen name={'Game'} component={GameScreen} />
      <MainTab.Screen name={'Option'} component={OptionScreen} />
    </MainTab.Navigator>
  );
}

export default MainNavigation;
