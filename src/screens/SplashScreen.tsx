import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { css } from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

function SplashScreen({ navigation }: NativeStackScreenProps<any>) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);
  }, [navigation]);
  return (
    <SafeAreaView>
      <View
        style={css`
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          background-color: #fff;
        `}>
        <Image style={{ width: 100, height: 100 }} source={require('/assets/app_icon.png')} />
      </View>
    </SafeAreaView>
  );
}

export default SplashScreen;
