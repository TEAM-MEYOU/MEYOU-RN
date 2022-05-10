import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { css } from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkMember, Member } from '@apis/member';
import { useQueryClient } from 'react-query';
import { RootStackNavigator } from '@navigation/RootNavigation';

function SplashScreen({ navigation }: NativeStackScreenProps<RootStackNavigator, 'Splash'>) {
  const queryClient = useQueryClient();

  const getKakao = async () => {
    const kakao = await AsyncStorage.getItem('kakao');
    if (kakao) {
      const member: Member = await checkMember(kakao);
      queryClient.setQueryData('user', member);
      member.coupleInfo ? navigation.navigate('Main') : navigation.navigate('GettingStarted');
    } else {
      navigation.navigate('Login');
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getKakao();
    }, 500);
  }, []);
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
        <Image style={{ width: 100, height: 100 }} source={require('/assets/icons/app_title.png')} />
      </View>
    </SafeAreaView>
  );
}

export default SplashScreen;
