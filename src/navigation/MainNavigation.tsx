import React, { useCallback } from 'react';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
import GameScreen from '@screens/GameScreen';
import { Image } from 'react-native';
import colors from '@constants/colors';
import DiaryNavigation from '@navigation/DiaryNavigation';
import { useFetchDiaryByDate, useFetchUser } from '@hooks/queries';
import { ToJavaLocaleDate } from '@utils/date';
import ChartNavigation from '@navigation/ChartNavigation';
import OptionNavigation from '@navigation/OptionNavigation';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackNavigator } from '@navigation/RootNavigation';

export type MainTabNavigator = {
  Home: undefined;
  DiaryNavigation: undefined;
  ChartNavigation: undefined;
  Game: undefined;
  OptionNavigation: undefined;
};

export type MainTabNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackNavigator>,
  BottomTabNavigationProp<MainTabNavigator>
>;
const MainTab = createBottomTabNavigator<MainTabNavigator>();

const TabMenu = {
  Home: 'home',
  Diary: 'diary',
  Chart: 'chart',
  Game: 'game',
  Option: 'option',
} as const;

type TabMenuValue = typeof TabMenu[keyof typeof TabMenu];

function MainNavigation() {
  const today = ToJavaLocaleDate(new Date());
  const fetchUser = useFetchUser();
  const fetchDiaryDate = useFetchDiaryByDate(fetchUser.data!.id!, today);

  return (
    <MainTab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: colors.grey400,
        tabBarActiveTintColor: colors.content200,
      }}>
      <MainTab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{ tabBarIcon: props => <TabBarIcon name={'home'} {...props} /> }}
      />
      <MainTab.Screen
        name={'DiaryNavigation'}
        component={DiaryNavigation}
        options={{ tabBarIcon: props => <TabBarIcon name={'diary'} {...props} /> }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            fetchDiaryDate.data
              ? navigation.navigate('DiaryNavigation', { screen: 'Complete' })
              : navigation.navigate('DiaryNavigation', { screen: 'Diary' });
          },
        })}
      />
      <MainTab.Screen
        name={'ChartNavigation'}
        component={ChartNavigation}
        options={{ tabBarIcon: props => <TabBarIcon name={'chart'} {...props} /> }}
      />
      <MainTab.Screen
        name={'Game'}
        component={GameScreen}
        options={{ tabBarIcon: props => <TabBarIcon name={'game'} {...props} /> }}
      />
      <MainTab.Screen
        name={'OptionNavigation'}
        component={OptionNavigation}
        options={{ tabBarIcon: props => <TabBarIcon name={'option'} {...props} /> }}
      />
    </MainTab.Navigator>
  );
}

interface Props {
  focused: boolean;
  color: string;
  size: number;
  name: TabMenuValue;
}

const TabBarIcon = (props: Props) => {
  const getIconPath = useCallback(() => {
    switch (props.name) {
      case 'home':
        return require('/assets/icons/home.png');
      case 'chart':
        return require('/assets/icons/chart.png');
      case 'diary':
        return require('/assets/icons/diary.png');
      case 'game':
        return require('/assets/icons/game.png');
      case 'option':
        return require('/assets/icons/setting.png');
    }
  }, []);
  return <Image style={{ width: props.size, height: props.size, tintColor: props.color }} source={getIconPath()} />;
};

export default MainNavigation;
