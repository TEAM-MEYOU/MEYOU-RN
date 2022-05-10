import React, { ReactNode, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import styled, { css } from '@emotion/native';
import colors from '@constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomCTA from '@components/BottomCTA';
import { makeAuthCode } from '@apis/couple';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFetchUser } from '@hooks/queries';
import { RootStackNavigator } from '@navigation/RootNavigation';

function AuthCodeMakeScreen({ navigation }: NativeStackScreenProps<RootStackNavigator, 'AuthCodeMake'>) {
  const fetchUser = useFetchUser();
  const [uniqueCode, setUniqueCode] = useState('');
  const [authCode, setAuthCode] = useState('');

  const handlePressMakeButton = async () => {
    if (!uniqueCode) {
      Alert.alert('상대방 ID를 입력해주세요!');
    } else {
      try {
        if (fetchUser.data) {
          const code = await makeAuthCode(fetchUser.data.uniqueCode, uniqueCode);
          setAuthCode(String(code));
        }
      } catch (e) {
        Alert.alert('유효하지 않은 ID입니다.');
      }
    }
  };
  return (
    <SafeAreaView
      edges={['bottom']}
      style={css`
        flex: 1;
        padding: 15px;
      `}>
      {authCode ? (
        <>
          <TitleText>인증코드</TitleText>
          <SubText>상대방에게 인증코드를 알려주세요</SubText>
          <View
            style={css`
              padding: 30px 60px;
              flex-direction: row;
              justify-content: space-between;
            `}>
            <AuthCodeText>{authCode[0]}</AuthCodeText>
            <AuthCodeText>{authCode[1]}</AuthCodeText>
            <AuthCodeText>{authCode[2]}</AuthCodeText>
            <AuthCodeText>{authCode[3]}</AuthCodeText>
          </View>
          <BottomCTA onPress={() => navigation.goBack()}>확인</BottomCTA>
        </>
      ) : (
        <>
          <TitleText>상대방 ID를 입력해주세요</TitleText>
          <SubText>인증코드 생성을 위해 필요힙니다</SubText>
          <UniqueCodeInput
            value={uniqueCode}
            onChangeText={text => setUniqueCode(text.replace(/[^0-9]/g, ''))}
            keyboardType={'numeric'}
          />
          <BottomCTA onPress={handlePressMakeButton}>인증코드 생성</BottomCTA>
        </>
      )}
    </SafeAreaView>
  );
}

const TitleText = styled.Text`
  font-size: 21px;
  font-weight: 700;
  width: 100%;
`;

const SubText = styled.Text`
  width: 100%;
  margin-top: 5px;
  color: ${colors.grey600};
`;

const UniqueCodeInput = styled.TextInput`
  width: 100%;
  height: 40px;
  border-bottom-width: 2px;
  font-size: 25px;
  font-weight: 600;
  border-bottom-color: ${colors.content200};
  margin-top: 30px;
`;

interface AuthCodeTextProps {
  children: ReactNode;
}

function AuthCodeText({ children }: AuthCodeTextProps) {
  return (
    <View
      style={css`
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 12px;
        border-width: 1px;
        background-color: ${colors.content100};
        border-color: ${colors.content100};
      `}>
      <Text
        style={css`
          color: white;
          font-weight: 600;
          font-size: 20px;
        `}>
        {children}
      </Text>
    </View>
  );
}

export default AuthCodeMakeScreen;
