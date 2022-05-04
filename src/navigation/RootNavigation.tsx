import React from 'react';
import SplashScreen from '@screens/SplashScreen';
import LoginScreen from '@screens/LoginScreen';
import MainNavigation from '@navigation/MainNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConnectionScreen from '@screens/ConnectionScreen';
import CompleteScreen from '@screens/CompleteScreen';
import AuthCodeMakeScreen from '@screens/AuthCodeMakeScreen';

const Stack = createNativeStackNavigator();

function RootNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        contentStyle: { backgroundColor: 'white' },
      }}>
      <Stack.Screen name={'Splash'} component={SplashScreen} />
      <Stack.Screen name={'Login'} component={LoginScreen} />
      <Stack.Screen name={'Connection'} component={ConnectionScreen} />
      <Stack.Screen name={'Complete'} component={CompleteScreen} />
      <Stack.Screen
        name={'AuthCodeMake'}
        component={AuthCodeMakeScreen}
        options={{ gestureEnabled: true, headerShown: true, headerTitle: '인증코드 생성' }}
      />
      <Stack.Screen name={'Main'} component={MainNavigation} />
    </Stack.Navigator>
  );
}

export default RootNavigation;
