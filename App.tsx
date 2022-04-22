import React from 'react';
import SplashScreen from '@screens/SplashScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/LoginScreen';
import MainNavigation from '@navigation/MainNavigation';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={'Splash'} component={SplashScreen} />
          <Stack.Screen name={'Login'} component={LoginScreen} />
          <Stack.Screen name={'Main'} component={MainNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
