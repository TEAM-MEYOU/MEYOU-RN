import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import OptionScreen from '@screens/options/OptionScreen';
import CoupleDataChangeScreen from '@screens/options/CoupleDataChangeScreen';
import ProfileChangeScreen from '@screens/options/ProfileChangeScreen';
import CoupleDisconnectScreen from '@screens/options/CoupleDisconnectScreen';
import WithdrawScreen from '@screens/options/WithdrawScreen';
import { CompositeNavigationProp } from '@react-navigation/native';
import { MainTabNavigationProp } from '@navigation/MainNavigation';

export type OptionStackNavigator = {
  Option: undefined;
  CoupleDataChange: undefined;
  ProfileChange: undefined;
  CoupleDisconnect: undefined;
  Withdraw: undefined;
};

export type OptionNavigationProp = CompositeNavigationProp<
  MainTabNavigationProp,
  NativeStackNavigationProp<OptionStackNavigator>
>;

const OptionStack = createNativeStackNavigator<OptionStackNavigator>();

function OptionNavigation() {
  return (
    <OptionStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        contentStyle: { backgroundColor: 'white' },
        headerTitle: '',
        headerShadowVisible: false,
      }}>
      <OptionStack.Screen name={'Option'} component={OptionScreen} options={{ headerShown: false }} />
      <OptionStack.Group>
        <OptionStack.Screen name={'CoupleDataChange'} component={CoupleDataChangeScreen} />
      </OptionStack.Group>
      <OptionStack.Screen name={'ProfileChange'} component={ProfileChangeScreen} />
      <OptionStack.Screen name={'CoupleDisconnect'} component={CoupleDisconnectScreen} />
      <OptionStack.Screen name={'Withdraw'} component={WithdrawScreen} />
    </OptionStack.Navigator>
  );
}

export default OptionNavigation;
