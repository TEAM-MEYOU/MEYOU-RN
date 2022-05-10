import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View } from 'react-native';
import { getKakaoProfile, signInWithKakao } from '@apis/kakao';
import { css } from '@emotion/native';
import ImageButton from '@components/ImageButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkMember, getMember, Member, registerMember, RegisterMember } from '@apis/member';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQueryClient } from 'react-query';
import Loading from '@components/Loading';
import { RootStackNavigator } from '@navigation/RootNavigation';

function LoginScreen({ navigation }: NativeStackScreenProps<RootStackNavigator, 'Login'>) {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  // 로그인 성공 함수
  const onLoginSuccess = async (member: Member) => {
    // 스토어에 kakao계정 저장
    await AsyncStorage.setItem('kakao', member.kakao);
    queryClient.setQueryData('user', member);
    // 네비게이션 이동
    member.coupleInfo ? navigation.navigate('Main') : navigation.navigate('GettingStarted');
  };
  const handleClickLogin = async () => {
    try {
      // 카카오 로그인 진행
      await signInWithKakao();
      setLoading(true);
      // 카카오 프로필 가져오가
      const profile: any = await getKakaoProfile();
      const uniqueCode = profile.id;
      const kakao = profile.email;
      // 미유 회원인지 API 요청
      try {
        // 회원일 경우 바로 로그인 처리
        const member = await checkMember(kakao);
        await onLoginSuccess(member);
      } catch (e) {
        // 회원이 아니면 회원가입 후 로그인 처리
        const regMember: RegisterMember = {
          uniqueCode: uniqueCode,
          kakao: kakao,
        };
        const id = await registerMember(regMember);
        const member = await getMember(id);
        await onLoginSuccess(member);
      }
    } catch (e) {
      console.log(e);
    }
  };
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
        <Image style={{ width: 100, height: 100, marginBottom: 100 }} source={require('/assets/icons/app_title.png')} />
        <ImageButton
          style={{ width: 200, resizeMode: 'contain' }}
          uri={require('/assets/icons/kakao_login_large_narrow.png')}
          onPress={handleClickLogin}
        />
        {loading && <Loading />}
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
